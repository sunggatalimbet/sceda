export interface ICourse {
	courseName: string | null;
	courseTimeSlot: string | null;
	courseType: string | null;
	courseId: string | null;
	courseClassroom: string | null;
	courseTutors: string | null;
	time: ITime;
}
export interface ITime {
	start: IStart;
	end: IEnd;
}

export interface IStart {
	hh: number;
	mm: number;
}

export interface IEnd {
	hh: number;
	mm: number;
}

export type IThemesNames =
	| "default"
	| "halloween"
	| "hello kitty"
	| "ocean"
	| "forest"
	| "sunset"
	| "cyberpunk"
	| "pastel";

export interface ApiError {
	message: string;
	code?: string;
	status?: number;
}
