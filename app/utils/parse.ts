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

export const parseDay = (input: string): ICourse => {
	if (!input) {
		throw new Error("Empty slot");
	}

	function cleanInput(input: string) {
		return input
			.replace(/\+\s*$/gm, "") // Remove + at the end of lines
			.replace(/^\s*'/gm, "") // Remove starting single quotes
			.replace(/'\s*$/gm, "") // Remove ending single quotes
			.replace(/\n\s*/g, " ") // Replace newlines with a space
			.trim(); // Trim leading/trailing whitespace
	}
	const cleanedInput = cleanInput(input);
	// Updated regex patterns
	const classNameRegex = /<span style="font-weight:bold;">(.*?)<\/span>/;
	const timeRegex = /\((\d{2}:\d{2})-(\d{2}:\d{2})\)/;
	const cabinetRegex = /(\d+\.\d+)<br><i/;

	// Extract data using the patterns
	const classNameMatch = cleanedInput.match(classNameRegex);
	const timeMatch = cleanedInput.match(timeRegex);
	const cabinetMatch = cleanedInput.match(cabinetRegex);

	if (!classNameMatch || !timeMatch) {
		throw new Error("Invalid course format");
	}

	const className = classNameMatch[1].trim();
	const classStartTime = timeMatch[1];
	const classEndTime = timeMatch[2];
	const classCabinet = cabinetMatch ? cabinetMatch[1] : "";

	// Format to match your UserScheduleItem interface
	const parsedCourse = {
		label: className,
		title: `${classStartTime}-${classEndTime}`,
		info: "0 ECTS credit",
		teacher: input.split("<br>")[3]?.trim() || "",
		cab: classCabinet,
		id: className.split(" ")[0] + className.split(" ")[1],
		time: {
			start: {
				hh: parseInt(classStartTime.split(":")[0], 10),
				mm: parseInt(classStartTime.split(":")[1], 10),
			},
			end: {
				hh: parseInt(classEndTime.split(":")[0], 10),
				mm: parseInt(classEndTime.split(":")[1], 10),
			},
		},
	};

	console.log(parsedCourse);
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
							?.map((x) => `${x.id}${x.title}`)
							.includes(`${item.id}${item.title}`)
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

export const parseTime = (str: string) => {
	const [hh, mm] = str.split(":");
	return {
		hh: hh.padStart(2, "0"), // Ensures two digits for hours
		mm: mm.padStart(2, "0"), // Ensures two digits for minutes
	};
};
