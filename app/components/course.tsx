import { ICourse, IThemesNames } from "../types";

type Props = {
	course: ICourse;
	currentTheme: IThemesNames;
};

export const Course = ({ course, currentTheme }: Props) => {
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

	const bgColor = identifyBackgroundColor(course.id, currentTheme);

	const topPercentage = timeToPercentage(
		course.time.start.hh + course.time.start.mm / 60,
	);
	const height = getDurationPercentage(
		course.time.start.hh + course.time.start.mm / 60,
		course.time.end.hh + course.time.end.mm / 60,
	);

	return (
		<div
			className={`absolute w-full rounded-lg p-2 text-white ${bgColor}`}
			style={{
				top: `${topPercentage}%`,
				height: `${height}%`,
				left: 0,
			}}
		>
			<div className="flex flex-col justify-between items-start gap-1 h-full">
				<div>
					<div className="text-[12px] leading-[15px] font-semibold">
						{convertCourseIdToName(course.id)}
					</div>
					<div className="text-[8px] leading-[10px] opacity-90 font-extrabold">
						{course.cab}
					</div>
				</div>
			</div>
		</div>
	);
};

const identifyBackgroundColor = (
	courseId: string,
	currentTheme: IThemesNames,
) => {
	switch (currentTheme) {
		case "halloween":
			switch (courseId) {
				case "FMAT041":
					return "bg-[#7C7C7C]";
				case "FLDP095":
					return "bg-[#000000]";
				case "FEAP020":
					return "bg-[#404040]";
				default:
					return "bg-[#404040]";
			}
		case "hello kitty":
			switch (courseId) {
				case "FMAT041":
					return "bg-[#B701FF]";
				case "FLDP095":
					return "bg-[#EF23BF]";
				case "FEAP020":
					return "bg-[#E80E64]";
				default:
					return "bg-[#404040]";
			}
		default: // default theme
			switch (courseId) {
				case "FMAT041":
					return "bg-[#EB5D65]";
				case "FLDP095":
					return "bg-[#31A8E0]";
				case "FEAP020":
					return "bg-[#27C253]";
				default:
					return "bg-[#404040]";
			}
	}
};

const convertCourseIdToName = (courseId: string) => {
	switch (courseId) {
		case "FMAT041":
			return "Math";
		case "FLDP095":
			return "LS";
		case "FEAP020":
			return "EAP";
		default:
			return "Unknown";
	}
};
