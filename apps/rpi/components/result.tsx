"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

interface ResultProps {
	icon: React.ReactNode;
	result: string;
	type: "success" | "error";
}

export const Result = ({ icon, result, type }: ResultProps) => {
	const searchParams = useSearchParams();
	const router = useRouter();
	const id = searchParams.get("id");

	React.useEffect(() => {
		const timeout = setTimeout(() => {
			router.push("/");
		}, 2000);
		return () => clearTimeout(timeout);
	}, [router]);

	const colors = {
		success: {
			iconBg: "from-emerald-500 to-emerald-600",
			iconGlow: "bg-emerald-400/20",
			titleGradient: "from-emerald-400 to-emerald-800",
			lineGradient: "from-emerald-400 to-emerald-800",
		},
		error: {
			iconBg: "from-red-500 to-red-600",
			iconGlow: "bg-red-400/20",
			titleGradient: "from-red-600 to-pink-600",
			lineGradient: "from-red-400 to-pink-500",
		},
	};

	const currentColors = colors[type];

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
							<div
								className={`w-24 h-24 bg-gradient-to-br ${currentColors.iconBg} rounded-2xl flex items-center justify-center shadow-lg`}
							>
								<div
									className={`w-12 h-12 text-white flex items-center justify-center`}
								>
									{icon}
								</div>
							</div>
						</div>
					</div>

					<h1
						className={`text-3xl font-bold bg-gradient-to-r ${currentColors.titleGradient} bg-clip-text text-transparent mb-3`}
					>
						{result}
					</h1>

					{id && (
						<div className="mb-6">
							<p className="text-sm text-gray-500 mb-2">Details</p>
							<p className="text-lg font-medium text-gray-800 bg-gray-50 rounded-xl px-4 py-2 border border-gray-200">
								{id}
							</p>
						</div>
					)}

					<div
						className={`w-20 h-1 bg-gradient-to-r ${currentColors.lineGradient} rounded-full mx-auto mb-6`}
					></div>
				</div>
			</div>
		</div>
	);
};
