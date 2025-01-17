import { z } from "zod";

export const scheduleTypeResolver = (html: string) => {
	try {
		const data =
			html.split("jQuery.extend(Drupal.settings, ")[1]?.split("})")[0] +
			"}";
		const parsed = JSON.parse(data);

		const dataScheme = z.object({
			personalSchedule: z.object({
				access: z.object({
					current: z.number(),
					reg: z.number(),
				}),
			}),
		});

		const result = dataScheme.parse(parsed);

		if (result.personalSchedule.access.reg === 1) {
			return "reg";
		}

		return "current";
	} catch (e) {
		console.error(e);
		return "current";
	}
};
