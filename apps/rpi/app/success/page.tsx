import { Result } from "@ryft/rpi/components/result";
import { Check } from "lucide-react";
import React from "react";

const SuccessPage = () => {
	return (
		<React.Suspense fallback={<div>Loading...</div>}>
			<Result
				icon={<Check className="w-10 h-10 text-green-600" />}
				result="VERIFIED"
			/>
		</React.Suspense>
	);
};

export default SuccessPage;
