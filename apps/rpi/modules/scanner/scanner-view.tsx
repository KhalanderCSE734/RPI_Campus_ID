"use client";

import { useScanner } from "@ryft/rpi/modules/scanner/use-scanner";
import { Input } from "@ryft/ui/components/input";
import { ScanLine, User } from "lucide-react";
import React from "react";

export const ScannerView = () => {
	const { isSubmitting, handleChange, handleKeyDown } = useScanner();

	return (
		<div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden flex items-center justify-center">
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				<div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl"></div>
				<div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-100/30 rounded-full blur-3xl"></div>
			</div>

			<div className="relative z-10 max-w-sm w-full mx-4">
				<div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-sm border border-white/20 p-8 text-center">
					<div className="flex justify-center mb-6">
						<div className="relative">
							<div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
								<ScanLine className="w-10 h-10 text-white" strokeWidth={2} />
							</div>
							<div className="absolute inset-0 w-20 h-20 bg-blue-400/20 rounded-2xl blur-xl"></div>
						</div>
					</div>

					<h1 className="text-2xl font-semibold text-gray-800 mb-2">
						Ready to Scan
					</h1>

					<p className="text-gray-600 mb-8 leading-relaxed">
						Position your barcode or QR code in front of the scanner
					</p>

					<div className="flex justify-center mb-6">
						<div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center border border-gray-200">
							<User className="w-8 h-8 text-gray-500" strokeWidth={1.5} />
						</div>
					</div>
				</div>

				<Input
					className="sr-only"
					autoFocus
					onChange={handleChange}
					onKeyDown={handleKeyDown}
					disabled={isSubmitting}
				/>
			</div>
		</div>
	);
};
