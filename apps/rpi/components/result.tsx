import { Card, CardContent } from "@ryft/ui/components/card";
import type React from "react";

interface ResultProps {
	usn: string;
	icon: React.ReactNode;
	result: string;
}

export const Result = ({ usn, icon, result }: ResultProps) => {
	return (
		<div className="h-screen w-full mx-auto bg-gradient-to-br bg-muted flex items-center justify-center p-4">
			<Card className="max-w-[400px] w-full border bg-background/90 backdrop-blur-sm">
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
