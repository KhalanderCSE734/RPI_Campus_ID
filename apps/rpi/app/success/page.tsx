import { Result } from "@ryft/rpi/components/result";
import { Check } from "lucide-react";
import React from "react";

const SuccessPage = () => {
	return (
		<React.Suspense fallback={<div>Loading...</div>}>
			<Result
				icon={<Check className="w-10 h-10" strokeWidth={2.5} />}
				result="VERIFIED"
				type="success"
			/>
		</React.Suspense>
	);
};

export default SuccessPage;
