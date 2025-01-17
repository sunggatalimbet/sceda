import { useMutation } from "react-query";
import { ICourse } from "../types";

type GetScheduleParams = {
	username: string;
	password: string;
};

export const useGetSchedule = () => {
	return useMutation({
		mutationFn: async ({ username, password }: GetScheduleParams) => {
			const response = await fetch("/api/registrar", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ username, password }),
			});

			const data = await response.json();
			if (!data.success) throw new Error(data.error);

			return data.schedule as ICourse[][];
		},
	});
};
