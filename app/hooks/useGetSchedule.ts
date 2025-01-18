import { useMutation } from "react-query";
import { toast } from "react-hot-toast";
import { ApiError, errorCodes } from "../utils/api-error";
import type { ICourse } from "../types";

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

				return data.schedule as ICourse[][];
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
