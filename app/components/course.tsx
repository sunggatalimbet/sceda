import { ICourse, IThemesNames } from "../types";
import { useState } from "react";
import { CourseModal } from "./course-modal";

type Props = {
	course: ICourse;
	currentTheme: IThemesNames;
};

export const Course = ({ course, currentTheme }: Props) => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const timeToPercentage = (time: number) => {
		const startTime = 9; // 9:00 AM
		const endTime = 17; // 5:00 PM
		const totalHours = endTime - startTime;
		return ((time - startTime) / totalHours) * 100;
	};

	const getDurationPercentage = (startTime: number, endTime: number) => {
		const totalHours = 17 - 9; // 8 hours total
		return ((endTime - startTime) / totalHours) * 100;
	};

	const bgColor = identifyBackgroundColor(course.courseId, currentTheme);

	const topPercentage = timeToPercentage(
		course.time.start.hh + course.time.start.mm / 60,
	);
	const height = getDurationPercentage(
		course.time.start.hh + course.time.start.mm / 60,
		course.time.end.hh + course.time.end.mm / 60,
	);

	return (
		<>
			<div
				className={`absolute w-full rounded-lg p-2 text-white ${bgColor} cursor-pointer hover:brightness-110 transition-all`}
				style={{
					top: `${topPercentage}%`,
					height: `${height}%`,
					left: 0,
				}}
				onClick={() => setIsModalOpen(true)}
			>
				<div className="flex flex-col justify-between items-start gap-1 h-full">
					<div>
						<div className="text-[12px] leading-[15px] font-semibold">
							{convertCourseIdToName(course)}
						</div>
						<div className="text-[8px] leading-[10px] opacity-90 font-extrabold">
							{course.courseClassroom}
						</div>
					</div>
				</div>
			</div>

			<CourseModal
				course={course}
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
			/>
		</>
	);
};

const identifyBackgroundColor = (
	courseId: string | null,
	currentTheme: IThemesNames,
) => {
	switch (currentTheme) {
		case "halloween":
			switch (courseId) {
				case "FMAT 041":
					return "bg-[#7C7C7C]";
				case "FLDP 095":
					return "bg-[#000000]";
				case "FEAP 020":
					return "bg-[#404040]";
				default:
					return "bg-[#404040]";
			}
		case "hello kitty":
			switch (courseId) {
				case "FMAT 041":
					return "bg-[#B701FF]";
				case "FLDP 095":
					return "bg-[#EF23BF]";
				case "FEAP 020":
					return "bg-[#E80E64]";
				default:
					return "bg-[#404040]";
			}
		case "ocean":
			switch (courseId) {
				case "FMAT 041":
					return "bg-[#003459]"; // Dark Ocean Blue
				case "FLDP 095":
					return "bg-[#007EA7]"; // Medium Ocean Blue
				case "FEAP 020":
					return "bg-[#2695BF]"; // Light Ocean Blue
				default:
					return "bg-[#00171F]"; // Deep Ocean Black
			}
		case "forest":
			switch (courseId) {
				case "FMAT 041":
					return "bg-[#2D6A4F]"; // Dark Forest Green
				case "FLDP 095":
					return "bg-[#40916C]"; // Medium Forest Green
				case "FEAP 020":
					return "bg-[#52B788]"; // Light Forest Green
				default:
					return "bg-[#74C69D]";
			}
		case "sunset":
			switch (courseId) {
				case "FMAT 041":
					return "bg-[#E85D04]"; // Bright Orange
				case "FLDP 095":
					return "bg-[#DC2F02]"; // Deep Red
				case "FEAP 020":
					return "bg-[#F48C06]"; // Golden Yellow
				default:
					return "bg-[#FAA307]";
			}
		case "cyberpunk":
			switch (courseId) {
				case "FMAT 041":
					return "bg-[#FF0080]"; // Neon Pink
				case "FLDP 095":
					return "bg-[#7B2CBF]"; // Electric Purple
				case "FEAP 020":
					return "bg-[#08C189]"; // Neon Turquoise
				default:
					return "bg-[#3A0CA3]";
			}
		case "pastel":
			switch (courseId) {
				case "FMAT 041":
					return "bg-[#E57FB3]"; // Deeper Pastel Pink
				case "FLDP 095":
					return "bg-[#E8A87C]"; // Deeper Pastel Peach
				case "FEAP 020":
					return "bg-[#FF8B8B]"; // Deeper Pastel Rose
				default:
					return "bg-[#E8C4A4]"; // Deeper Pastel Beige
			}
		default: // default theme
			switch (courseId) {
				case "FMAT 041":
					return "bg-[#EB5D65]";
				case "FLDP 095":
					return "bg-[#31A8E0]";
				case "FEAP 020":
					return "bg-[#27C253]";
				default:
					return "bg-[#404040]";
			}
	}
};

const convertCourseIdToName = (course: ICourse) => {
	const { courseId, courseType } = course;
	switch (courseId) {
		case "FMAT 041":
			return courseType === "Lecture"
				? "M.L"
				: courseType === "Seminar"
				? "M.S"
				: "M";
		case "FLDP 095": {
			return courseType === "Lecture"
				? "LS.L"
				: courseType === "Seminar"
				? "LS.S"
				: "LS";
		}
		case "FEAP 020":
			return "EAP";
		default:
			return "Unknown";
	}
};
