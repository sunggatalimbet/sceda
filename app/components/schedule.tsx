import { ICourse, IThemesNames } from "../types";
import { Course } from "./course";

type Props = {
	courses: ICourse[][] | null;
	currentTheme: IThemesNames;
};

export const Schedule = ({ courses, currentTheme }: Props) => {
	const hours = ["09", "10", "11", "12", "13", "14", "15", "16", "17"];
	const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];

	return (
		<div>
			<div className="pl-[23px] flex text-center  gap-2 h-full relative">
				{days.map((day) => (
					<div
						key={day}
						className="w-[58px] mb-1 text-[#B1B1B1] text-[10px] font-semibold"
					>
						{day}
					</div>
				))}
			</div>
			<div className="flex flex-row">
				<div className="h-[393px] flex flex-col justify-between text-[#B1B1B1] text-[10px] font-semibold w-6">
					{hours.map((hour) => (
						<div key={hour} className="flex flex-col items-center">
							<span>{hour === "17" ? "" : hour}</span>
						</div>
					))}
				</div>

				<div className="flex flex-row gap-2 w-full">
					{courses?.map(
						(day, dayIndex) =>
							day.length > 0 && (
								<div
									key={dayIndex}
									className="w-1/5 h-[393px] rounded-[10px] border border-[#dddddd]"
								>
									<div className="grid grid-rows-6 gap-2 h-full relative">
										{day.map((course, i) => (
											<Course
												key={i}
												course={course}
												currentTheme={currentTheme}
											/>
										))}
									</div>
								</div>
							),
					)}
				</div>
			</div>
		</div>
	);
};
