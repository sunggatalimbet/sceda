import { useMutation } from "react-query";
import { toast } from "react-hot-toast";
import { ApiError, errorCodes } from "../utils/api-error";
import type { ICourse } from "../types";

const isFoundationYearSchedule = (schedule: ICourse[][]) => {
	const foundationCourses = ["FMAT 041", "FLDP 095", "FEAP 020"];

	// Check if any day has at least one Foundation year course
	return schedule.some(day =>
		day.some(course =>
			foundationCourses.includes(course.courseId || "")
		)
	);
};

type GetScheduleParams = {
	username: string;
	password: string;
};

export const useGetSchedule = () => {
	return useMutation({
		mutationFn: async ({ username, password }: GetScheduleParams) => {
			try {
				const response = await fetch("/api/registrar", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ username, password }),
				});

				const data = await response.json();

				if (!response.ok) {
					throw new ApiError(
						data.error || "An unexpected error occurred",
						data.code || errorCodes.SERVER_ERROR,
						response.status,
					);
				}

				if (!data.success) {
					throw new ApiError(
						data.error,
						data.code || errorCodes.SERVER_ERROR,
						response.status,
					);
				}

				const schedule = data.schedule as ICourse[][];

				// Check if the schedule is for a Foundation year student
				if (!isFoundationYearSchedule(schedule)) {
					throw new ApiError(
						"Access is currently limited to Foundation year students. Support for undergraduate students is coming soon.",
						errorCodes.INVALID_ACCESS,
						403
					);
				}

				return schedule;
			} catch (error) {
				if (error instanceof ApiError) {
					throw error;
				}

				if (
					error instanceof TypeError &&
					error.message === "Failed to fetch"
				) {
					throw new ApiError(
						"Network error. Please check your connection.",
						errorCodes.NETWORK_ERROR,
						0,
					);
				}

				throw new ApiError(
					"An unexpected error occurred",
					errorCodes.SERVER_ERROR,
					500,
				);
			}
		},
		onError: (error: ApiError) => {
			const errorMessages = {
				[errorCodes.INVALID_CREDENTIALS]:
					"Invalid username or password",
				[errorCodes.INVALID_ACCESS]:
					"Access is currently limited to Foundation year students. Support for undergraduate students is coming soon.",
				[errorCodes.NETWORK_ERROR]:
					"Network error. Please check your connection",
				[errorCodes.PARSE_ERROR]: "Error processing schedule data",
				[errorCodes.SERVER_ERROR]: "An unexpected error occurred",
			};

			toast.error(errorMessages[error.code] || error.message);
			console.error("Error fetching schedule:", error);
		},
	});
};
