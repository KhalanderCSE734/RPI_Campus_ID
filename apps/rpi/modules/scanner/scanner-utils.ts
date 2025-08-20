export const sanitizeInput = (value: string): string =>
	value.replace(/[\r\n\s]+/g, "");
