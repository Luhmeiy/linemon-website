import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";

export const metadata: Metadata = {
	title: "Linemon",
	description: "Linemon",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className="font-mono min-h-dvh flex flex-col">
				<Navbar />
				{children}
			</body>
		</html>
	);
}
