"use client";

import { env } from "@ryft/rpi/lib/env";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";

export const useScanner = () => {
	const [id, setId] = React.useState("");
	const router = useRouter();
	const { NEXT_PUBLIC_API_URL } = env;

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const id = e.target.value.trim();
		setId(id);
	};

	const verifyMutation = useMutation({
		mutationFn: async (id: string) => {
			const response = await axios.post(`${NEXT_PUBLIC_API_URL}/verify`, {
				id,
			});
			return response.data as { verified?: boolean };
		},
		onSuccess: (data, id) => {
			const href = data?.verified
				? `/success?id=${encodeURIComponent(id)}`
				: `/error?id=${encodeURIComponent(id)}`;
			router.push(href);
		},
		onError: (_, id) => {
			router.push(`/error?id=${encodeURIComponent(id)}`);
		},
	});

	const submitUSN = React.useCallback(
		async (id: string) => {
			if (!id || verifyMutation.isPending) return;
			verifyMutation.mutate(id);
		},
		[verifyMutation],
	);

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			e.preventDefault();
			submitUSN(id);
		}
	};

	return {
		isSubmitting: verifyMutation.isPending,
		handleChange,
		handleKeyDown,
	};
};
