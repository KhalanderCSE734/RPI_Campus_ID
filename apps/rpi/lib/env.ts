import z from "zod";

export const envSchema = z.object({
	NEXT_PUBLIC_API_URL: z.url().default("http://localhost:8080"),
});

export const env = envSchema.parse({
	NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
});
