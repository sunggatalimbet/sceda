import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { ReactQueryProvider } from "./components/query-provider";
import type { Metadata } from "next";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Sceda - schedule under your fingertips",
	description: "Transform your class schedule into a beautiful wallpaper with just a few clicks",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ReactQueryProvider>
			<html lang="en">
				<body
					className={`min-h-screen flex items-end justify-center mx-auto max-w-[393px] antialiased ${inter.className}`}
				>
					{children}
					<Analytics />
				</body>
			</html>
		</ReactQueryProvider>
	);
}
