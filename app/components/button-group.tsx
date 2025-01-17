import { ArrowDownToLineIcon, PaletteIcon } from "lucide-react";
import { handleDownload } from "../utils/download";
import type { RefObject } from "react";

type Props = {
	pageRef: RefObject<HTMLDivElement | null>;
	buttonGroupRef: RefObject<HTMLDivElement | null>;
};

export const ButtonGroup = ({ pageRef, buttonGroupRef }: Props) => {
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
				onClick={() => console.log("change theme")}
				className="p-2 text-white rounded-lg bg-[#4F46E5] transition-colors"
			>
				<PaletteIcon size={16} />
			</button>
		</div>
	);
};
