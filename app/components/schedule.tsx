import { ICourse } from "../types";
import { Course } from "./course";
import Image from "next/image";

type Props = {
	courses: ICourse[][] | null;
};

export const Schedule = ({ courses }: Props) => {
	const hours = ["9:00", "10:00", "11:00", "12:00", "13:00", "14:00"];

	return (
		<div className="w-full">
			<div className="w-full flex text-[#B1B1B1] text-[12px] font-semibold mb-2">
				{hours.map((hour, i) => (
					<div key={hour} className="w-1/6 flex gap-1 items-center">
						{i > 0 && (
							<Image
								src={"/hour-divider.svg"}
								alt="|"
								width={2}
								height={20}
							/>
						)}
						<span>{hour}</span>
					</div>
				))}
			</div>

			<div className="space-y-4">
				{courses?.map(
					(day, dayIndex) =>
						day.length > 0 && (
							<div
								key={dayIndex}
								className="rounded-[10px] border-2 border-dashed border-[#E1E1E1]"
							>
								<div
									className="grid grid-cols-6 gap-2 h-full relative"
									style={{ height: "60px" }}
								>
									{day.map((course, i) => (
										<Course key={i} course={course} />
									))}
								</div>
							</div>
						),
				)}
			</div>
		</div>
	);
};
