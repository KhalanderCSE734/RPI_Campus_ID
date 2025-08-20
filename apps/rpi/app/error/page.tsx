import { Result } from "@ryft/rpi/components/result";
import { X } from "lucide-react";
import React from "react";

const ErrorPage = () => {
	return (
		<Result icon={<X className="w-10 h-10 text-red-600" />} result="Failed" />
	);
};

export default ErrorPage;
