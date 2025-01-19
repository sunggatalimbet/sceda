import { ICourse } from "../types";
import React, { useCallback } from "react";
import {
	BookOpenCheckIcon,
	BuildingIcon,
	ClockIcon,
	UsersRoundIcon,
} from "lucide-react";

interface CourseModalProps {
	course: ICourse;
	isOpen: boolean;
	onClose: () => void;
}

interface CourseData {
	icon: React.ReactNode;
	label: string;
	value: string | null;
}

const formatTime = (
	start: { hh: number; mm: number },
	end: { hh: number; mm: number },
) => {
	return `${String(start.hh).padStart(2, "0")}:${String(start.mm).padStart(
		2,
		"0",
	)} - ${String(end.hh).padStart(2, "0")}:${String(end.mm).padStart(2, "0")}`;
};

export const CourseModal = ({ course, isOpen, onClose }: CourseModalProps) => {
	const handleOverlayClick = useCallback(
		(e: React.MouseEvent) => {
			if (e.target === e.currentTarget) {
				onClose();
			}
		},
		[onClose],
	);

	const iconProps = {
		size: 24,
		className: "flex-shrink-0 text-gray-600",
	};

	const courseData: CourseData[] = [
		{
			icon: <BookOpenCheckIcon {...iconProps} />,
			label: "Type",
			value: course.courseType,
		},
		{
			icon: <UsersRoundIcon {...iconProps} />,
			label: "Tutors",
			value: course.courseTutors,
		},
		{
			icon: <BuildingIcon {...iconProps} />,
			label: "Room",
			value: course.courseClassroom,
		},
		{
			icon: <ClockIcon {...iconProps} />,
			label: "Time",
			value: formatTime(course.time.start, course.time.end),
		},
	];

	if (!isOpen) return null;

	return (
		<div
			className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
			onClick={handleOverlayClick}
		>
			<div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 relative">
				<button
					onClick={onClose}
					className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
				>
					<svg
						className="w-6 h-6"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>

				<div className="space-y-4">
					<div className="flex items-center justify-between">
						<div>
							<h2 className="text-2xl font-bold text-gray-800">
								{course.courseName}
							</h2>
							<p className="text-sm text-gray-500">
								{course.courseTimeSlot}
							</p>
						</div>
					</div>

					<div className="space-y-2">
						{courseData.map((item, index) => (
							<div
								key={index}
								className="flex items-center space-x-2"
							>
								{item.icon}
								<p className="text-gray-700">
									<span className="font-medium">
										{item.label}:
									</span>{" "}
									{item.value}
								</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};
