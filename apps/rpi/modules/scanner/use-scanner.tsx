"use client";

import { env } from "@ryft/rpi/lib/env";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";

export const useScanner = () => {
	const [USN, setUSN] = React.useState("");
	const router = useRouter();
	const { NEXT_PUBLIC_API_URL } = env;

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const usn = e.target.value.trim();
		setUSN(usn);
	};

	const verifyMutation = useMutation({
		mutationFn: async (usn: string) => {
			const response = await axios.post(`${NEXT_PUBLIC_API_URL}/verify`, {
				usn,
			});
			return response.data as { verified?: boolean };
		},
		onSuccess: (data, usn) => {
			const href = data?.verified
				? `/success?usn=${encodeURIComponent(usn)}`
				: `/error?usn=${encodeURIComponent(usn)}`;
			router.push(href);
		},
		onError: (_, usn) => {
			router.push(`/error?usn=${encodeURIComponent(usn)}`);
		},
	});

	const submitUSN = React.useCallback(
		async (usn: string) => {
			if (!usn || verifyMutation.isPending) return;
			verifyMutation.mutate(usn);
		},
		[verifyMutation],
	);

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			e.preventDefault();
			submitUSN(USN);
		}
	};

	return {
		isSubmitting: verifyMutation.isPending,
		handleChange,
		handleKeyDown,
	};
};
