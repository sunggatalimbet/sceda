import { Inter } from "next/font/google";
import { ReactQueryProvider } from "./components/query-provider";
import type { Metadata } from "next";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Sceda - schedule under your fingertips",
	description: "CHOTAM",
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
					className={`min-h-screen flex items-end justify-center mx-auto max-w-[393px] ${inter.className}`}
				>
					{children}
				</body>
			</html>
		</ReactQueryProvider>
	);
}
