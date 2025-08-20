import { useScanner } from "@ryft/rpi/modules/scanner/use-scanner";
import { Card, CardContent } from "@ryft/ui/components/card";
import { Input } from "@ryft/ui/components/input";
import { User } from "lucide-react";
import React from "react";

export const ScannerView = () => {
	const { isSubmitting, handleChange, handleKeyDown } = useScanner();

	return (
		<div className="h-screen w-full mx-auto bg-muted flex items-center justify-center p-4">
			<Card className="max-w-[300px] w-full border bg-background/90 backdrop-blur-sm">
				<CardContent className="space-y-4">
					<Input
						className="sr-only"
						autoFocus
						onChange={handleChange}
						onKeyDown={handleKeyDown}
						disabled={isSubmitting}
					/>
					<div className="flex items-center justify-center">
						<User className="w-10 h-10" />
					</div>
					<p className="text-sm text-muted-foreground text-center">
						Scan your USN
					</p>
				</CardContent>
			</Card>
		</div>
	);
};
