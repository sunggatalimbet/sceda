"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowDownToLineIcon, PaletteIcon } from "lucide-react";
import { handleDownload } from "../utils/download";
import { IThemesNames } from "../types";
import type { RefObject } from "react";

type Props = {
	pageRef: RefObject<HTMLDivElement | null>;
	buttonGroupRef: RefObject<HTMLDivElement | null>;
	setCurrentTheme: (currentTheme: IThemesNames) => void;
	currentTheme: IThemesNames;
};

export const ButtonGroup = ({
	pageRef,
	buttonGroupRef,
	setCurrentTheme,
	currentTheme,
}: Props) => {
	const [isDropdownOpen, setDropdownOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
				setDropdownOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	const onChangeCurrentTheme = (themeName: IThemesNames) => {
		setCurrentTheme(themeName);
		setDropdownOpen(false);
	};

	return (
		<div ref={buttonGroupRef}>
			<div className="relative w-fit mx-auto mb-4" ref={dropdownRef}>
				<p className="text-sm text-indigo-600 font-medium mb-2 text-center">Current theme</p>
				<button
					onClick={() => setDropdownOpen(!isDropdownOpen)}
					className={`flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-indigo-100 to-indigo-50 
						rounded-xl border border-indigo-200 shadow-sm hover:shadow-md hover:border-indigo-300
						transition-all duration-300 group ${isDropdownOpen ? 'border-indigo-400 shadow-md' : ''}`}
				>
					<div className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse"></div>
					<span className="text-indigo-700 font-medium capitalize">
						{currentTheme}
					</span>
					<PaletteIcon size={16} className="text-indigo-400 group-hover:rotate-45 transition-transform ml-2" />
				</button>

				{isDropdownOpen && (
					<div className="absolute left-0 right-0 mt-2 py-2 bg-white rounded-xl shadow-xl 
						border border-gray-100 transform transition-all duration-200 z-10">
						{["default", "halloween", "hello kitty", "ocean", "forest", "sunset", "cyberpunk", "pastel"].map((theme) => (
							<li
								key={theme}
								className={`px-4 py-2.5 cursor-pointer flex items-center gap-2
									${currentTheme === theme
										? 'text-indigo-600 bg-indigo-50 font-medium'
										: 'text-gray-700 hover:bg-gray-50'} 
									transition-colors capitalize`}
								onClick={() => onChangeCurrentTheme(theme as IThemesNames)}
							>
								<div className={`w-2 h-2 rounded-full ${currentTheme === theme ? 'bg-indigo-600' : 'bg-gray-300'
									}`}></div>
								{theme}
							</li>
						))}
					</div>
				)}
			</div>
			<div
				className="w-full flex justify-center mb-10"
			>
				<button
					onClick={() => handleDownload({ pageRef, buttonGroupRef })}
					className="group relative px-4 py-2.5 text-white rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 
					hover:from-indigo-500 hover:to-indigo-600 shadow-lg hover:shadow-indigo-500/50 transition-all duration-300 
					flex items-center gap-2 overflow-hidden"
				>
					<ArrowDownToLineIcon size={18} className="group-hover:scale-110 transition-transform" />
					<p className="font-medium">Download</p>
				</button>
			</div>
		</div>
	);
};
