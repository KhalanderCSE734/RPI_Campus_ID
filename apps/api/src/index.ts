import "dotenv/config";
import app from "@ryft/api/app";
import { env } from "@ryft/api/lib/env";

app.listen(env.PORT, () => {
	console.log(`API Server is running on http://localhost:${env.PORT}`);
});
