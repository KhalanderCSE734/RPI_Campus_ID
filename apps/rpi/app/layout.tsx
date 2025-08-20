import type { Metadata } from "next";
import "@ryft/ui/globals.css";
import { Inter } from "next/font/google";

export const metadata: Metadata = {
	title: "Ryft",
	description: "Student ID Card Verification using Raspberry Pi 4",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={inter.className}>{children}</body>
		</html>
	);
}
