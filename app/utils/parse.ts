import { ICourse } from "../types";

type WeekCoursesData = {
	TIME: string;
	MONDAY: string;
	TUESDAY: string;
	WEDNESDAY: string;
	THURSDAY: string;
	FRIDAY: string;
	SATURDAY: string;
	SUNDAY: string;
};

const WEEKDAYS = [
	"MONDAY",
	"TUESDAY",
	"WEDNESDAY",
	"THURSDAY",
	"FRIDAY",
	"SATURDAY",
	"SUNDAY",
] as const;

const patterns = {
	courseName: /<span style="font-weight:bold;">([^<]+)<\/span>/,
	courseTimeSlot: /\((\d{2}:\d{2})-(\d{2}:\d{2})\)/,
	courseType: /(Seminar|Lecture)\s\d+/,
	courseId: /^([A-Z]{4}\s\d{3})/,
	courseClassroom: /(?<=<br>)([A-Za-z0-9]+\.[A-Za-z0-9]+)(?=<br>)/,
	courseTutors: /ECTS credit<br>([^<]+)<br>[A-Za-z0-9]+\.[A-Za-z0-9]+<br>/, // New pattern for tutors
};

function cleanInput(input: string) {
	return input
		.replace(/\+\s*$/gm, "") // Remove + at the end of lines
		.replace(/^\s*'/gm, "") // Remove starting single quotes
		.replace(/'\s*$/gm, "") // Remove ending single quotes
		.replace(/\n\s*/g, " ") // Replace newlines with a space
		.trim(); // Trim leading/trailing whitespace
}

export const parseTime = (str: string) => {
	const [hh, mm] = str.split(":");
	return {
		hh: hh.padStart(2, "0"), // Ensures two digits for hours
		mm: mm.padStart(2, "0"), // Ensures two digits for minutes
	};
};

export const parseDay = (rawInput: string): ICourse => {
	if (!rawInput) {
		throw new Error("Empty slot");
	}

	const input = cleanInput(rawInput);

	const courseNameMatch = input.match(patterns.courseName);
	const courseTimeMatch = input.match(patterns.courseTimeSlot);
	const courseTypeMatch = input.match(patterns.courseType);
	const courseClassroomMatch = input.match(patterns.courseClassroom);
	const courseTutorsMatch = input.match(patterns.courseTutors);

	if (!courseNameMatch || !courseTimeMatch) {
		throw new Error("Invalid course format");
	}

	const courseName = courseNameMatch ? courseNameMatch[1].trim() : null;
	const courseTimeSlot = courseTimeMatch
		? `${courseTimeMatch[1]}-${courseTimeMatch[2]}`
		: null;
	const courseType = courseTypeMatch ? courseTypeMatch[1] : null;

	const courseIdMatch = courseName
		? courseName.match(patterns.courseId)
		: null;
	const courseId = courseIdMatch ? courseIdMatch[1] : null;
	const courseClassroom = courseClassroomMatch
		? courseClassroomMatch[1]
		: null;
	const courseTutors = courseTutorsMatch ? courseTutorsMatch[1].trim() : null;

	const parsedCourse = {
		courseName: courseName,
		courseTimeSlot: courseTimeSlot,
		courseType: courseType,
		courseId: courseId,
		courseClassroom: courseClassroom,
		courseTutors: courseTutors,
		time: {
			start: {
				hh: parseInt(courseTimeMatch[1].split(":")[0], 10),
				mm: parseInt(courseTimeMatch[1].split(":")[1], 10),
			},
			end: {
				hh: parseInt(courseTimeMatch[2].split(":")[0], 10),
				mm: parseInt(courseTimeMatch[2].split(":")[1], 10),
			},
		},
	};

	return parsedCourse;
};

export const parseSchedule = (json: string) => {
	const data = JSON.parse(json);
	const week: ICourse[][] = [[], [], [], [], [], [], []];

	data.forEach((d: WeekCoursesData) => {
		WEEKDAYS.forEach((w, i) => {
			if (d[w] && d[w].trim() !== "") {
				// Check if slot is not empty
				try {
					const item = parseDay(d[w]);

					if (
						week[i]
							?.map((x) => `${x.courseId}${x.courseName}`)
							.includes(`${item.courseId}${item.courseName}`)
					)
						return;
					week[i]?.push(item);
				} catch (error) {
					// Skip empty slots or invalid formats
					if ((error as Error).message !== "Empty slot") {
						console.error(
							`Error parsing day: ${(error as Error).message}`,
						);
					}
				}
			}
		});
	});

	return week;
};
