import { Result } from "@ryft/rpi/components/result";
import { Check } from "lucide-react";
import React from "react";

const SuccessPage = () => {
	return (
		<Result
			usn="1BM23CS116"
			icon={<Check className="w-10 h-10 text-green-600" />}
			result="VERIFIED"
		/>
	);
};

export default SuccessPage;
