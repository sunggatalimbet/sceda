export interface ICourse {
	label: string;
	title: string;
	info: string;
	teacher: string;
	cab: string;
	id: string;
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

export type IThemesNames = "default" | "halloween" | "hello kitty";
