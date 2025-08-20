import cors from "cors";
import express from "express";
import "dotenv/config";

const app = express();

app.use(
	cors({
		origin: "*",
		credentials: true,
	}),
);

app.use(express.json());

app.get("/", (req, res) => {
	res.send({ success: true, message: "Server is Up and Running" });
});

/**
 * {
 * usn: string
 * timestamp: Date
 * gate: string
 * way: in | out
 * }
 *
 */
app.post("/verify", (req, res) => {
	/**
	 * 1. First we wlil get the USN
	 * 2. We will fetch the data from db and do some verification
	 * 3. Send the response
	 */
	console.log(req.body);
	const usn = req.body as { usn: string };

	//TODO
	const isVerified = false;

	res.json({
		verified: isVerified,
	});
});

export default app;
