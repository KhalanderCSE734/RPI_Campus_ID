"use client";

import { Card, CardContent } from "@ryft/ui/components/card";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

interface ResultProps {
	icon: React.ReactNode;
	result: string;
}

export const Result = ({ icon, result }: ResultProps) => {
	const searchParams = useSearchParams();
	const router = useRouter();
	const usn = searchParams.get("usn");

	React.useEffect(() => {
		const timeout = setTimeout(() => {
			router.push("/");
		}, 2000);
		return () => clearTimeout(timeout);
	}, [router]);

	return (
		<div className="h-screen w-full mx-auto bg-muted flex items-center justify-center p-4">
			<Card className="max-w-[300px] w-full border bg-background/90 backdrop-blur-sm">
				<CardContent className="p-8 text-center">
					<div className="inline-flex items-center justify-center w-20 h-20 bg-muted rounded-full mb-6">
						{icon}
					</div>
					<h1 className="text-3xl font-bold mb-3">{result}</h1>
					<p className="text-lg mb-6">{usn}</p>
					<div className="w-16 h-1 bg-gradient-to-r from-green-400 to-blue-500 rounded-full mx-auto mb-6"></div>
				</CardContent>
			</Card>
		</div>
	);
};
