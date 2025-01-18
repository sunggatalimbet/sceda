import html2canvas from "html2canvas";
import type { RefObject } from "react";

type Params = {
	pageRef: RefObject<HTMLDivElement | null>;
	buttonGroupRef: RefObject<HTMLDivElement | null>;
};

export const handleDownload = async ({ pageRef, buttonGroupRef }: Params) => {
	if (!pageRef.current || !buttonGroupRef.current) return;

	try {
		buttonGroupRef.current.style.display = "none";

		const canvas = await html2canvas(pageRef.current, {
			logging: false,
			useCORS: true,
			allowTaint: true,
			backgroundColor: "#ffffff",
			scale: (window.devicePixelRatio || 1) * 2,
			imageTimeout: 0,
		});

		const dataURL = canvas.toDataURL("image/png", 1.0);
		const link = document.createElement("a");
		link.href = dataURL;
		link.download = `schedule-${
			new Date().toISOString().split("T")[0]
		}.png`;
		link.click();
	} catch (error) {
		console.error("Error capturing page as image:", error);
	} finally {
		if (buttonGroupRef.current) {
			buttonGroupRef.current.style.display = "block";
		}
	}
};
