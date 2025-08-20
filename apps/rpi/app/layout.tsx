import "@ryft/ui/globals.css";
import { TanstackQueryProvider } from "@ryft/rpi/providers/query-client-provider";
import type { Metadata } from "next";
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
			<body className={inter.className}>
				<TanstackQueryProvider>{children}</TanstackQueryProvider>
			</body>
		</html>
	);
}
