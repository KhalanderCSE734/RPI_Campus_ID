import { Result } from "@ryft/rpi/components/result";
import { X } from "lucide-react";
import React from "react";

const ErrorPage = () => {
	return (
		<React.Suspense fallback={<div>Loading...</div>}>
			<Result
				icon={<X className="w-10 h-10" strokeWidth={2.5} />}
				result="Failed"
				type="error"
			/>
		</React.Suspense>
	);
};

export default ErrorPage;
