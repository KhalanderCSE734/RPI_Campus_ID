import express from "express";
import cors from "cors";
import 'dotenv/config'


const PORT = process.env.PORT || 4000;

const app = express();

const corsOptions = {
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  };

app.use(cors(corsOptions));
app.use(express.json());

app.get("/", (req, res) => {
  res.send({ success :true,message: "Server is Up and Running"});
});


export default app;