import html2canvas from "html2canvas";
import type { RefObject } from "react";

type Params = {
	pageRef: RefObject<HTMLDivElement | null>;
	buttonGroupRef: RefObject<HTMLDivElement | null>;
};

const isMobile = () => {
	return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
};

const isIOS = () => {
	return /iPhone|iPad|iPod/i.test(navigator.userAgent);
};

export const handleDownload = async ({ pageRef, buttonGroupRef }: Params) => {
	if (!pageRef.current || !buttonGroupRef.current) return;

	try {
		buttonGroupRef.current.style.visibility = "hidden";

		const canvas = await html2canvas(pageRef.current, {
			logging: false,
			useCORS: true,
			allowTaint: true,
			backgroundColor: "#ffffff",
			scale: (window.devicePixelRatio || 1) * 2,
			imageTimeout: 0,
		});

		const dataURL = canvas.toDataURL("image/png", 1.0);
		const fileName = `schedule-${new Date().toISOString().split("T")[0]}.png`;

		if (isMobile()) {
			// Convert base64 to blob
			const response = await fetch(dataURL);
			const blob = await response.blob();

			if (isIOS() && navigator.share) {
				// Use Web Share API for iOS
				try {
					const file = new File([blob], fileName, { type: 'image/png' });
					await navigator.share({
						files: [file],
						title: 'Schedule',
					});
					return;
				} catch (error) {
					console.error('Error sharing:', error);
				}
			}

			// For Android, create a special download link
			const link = document.createElement("a");
			link.href = URL.createObjectURL(blob);
			link.download = fileName;
			// Set MIME type to trigger gallery save on Android
			link.type = "image/png";
			// Add a special attribute for Android
			link.setAttribute("target", "_system");
			link.click();
			URL.revokeObjectURL(link.href);
		} else {
			// Desktop download
			const link = document.createElement("a");
			link.href = dataURL;
			link.download = fileName;
			link.click();
		}
	} catch (error) {
		console.error("Error capturing page as image:", error);
	} finally {
		if (buttonGroupRef.current) {
			buttonGroupRef.current.style.visibility = "visible";
		}
	}
};
