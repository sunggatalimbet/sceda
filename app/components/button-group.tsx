"use client";

import { useState } from "react";
import { ArrowDownToLineIcon, PaletteIcon } from "lucide-react";
import { handleDownload } from "../utils/download";
import { IThemesNames } from "../types";
import type { RefObject } from "react";

type Props = {
	pageRef: RefObject<HTMLDivElement | null>;
	buttonGroupRef: RefObject<HTMLDivElement | null>;
	setCurrentTheme: (currentTheme: IThemesNames) => void;
};

export const ButtonGroup = ({
	pageRef,
	buttonGroupRef,
	setCurrentTheme,
}: Props) => {
	const [isDropdownOpen, setDropdownOpen] = useState(false);

	const onChangeCurrentTheme = (themeName: IThemesNames) => {
		setCurrentTheme(themeName);
		setDropdownOpen(false);
	};

	return (
		<div
			ref={buttonGroupRef}
			className="w-full flex justify-end space-x-2 mb-10"
		>
			<button
				onClick={() => handleDownload({ pageRef, buttonGroupRef })}
				className="p-2 text-white rounded-lg bg-[#4F46E5] transition-colors"
			>
				<ArrowDownToLineIcon size={16} />
			</button>
			<button
				onClick={() => setDropdownOpen(!isDropdownOpen)}
				className="p-2 text-white rounded-lg bg-[#4F46E5] transition-colors"
			>
				<PaletteIcon size={16} />
			</button>
			{isDropdownOpen && (
				<div className="absolute shadow-lg rounded-lg z-10 text-xs font-semibold text-white mt-10 bg-[#4F46E5] list-none">
					<li
						className="px-4 cursor-pointer py-2 rounded-lg hover:bg-[#342dbc] transition-colors"
						onClick={() => onChangeCurrentTheme("default")}
					>
						Default
					</li>
					<li
						className="px-4 cursor-pointer py-2 rounded-lg hover:bg-[#342dbc] transition-colors"
						onClick={() => onChangeCurrentTheme("halloween")}
					>
						Halloween
					</li>
					<li
						className="px-4 cursor-pointer py-2 rounded-lg w-full hover:bg-[#342dbc] transition-colors"
						onClick={() => onChangeCurrentTheme("hello kitty")}
					>
						Hello Kitty
					</li>
				</div>
			)}
		</div>
	);
};
