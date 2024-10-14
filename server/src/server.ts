import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { router as authRouter } from "./routes/auth.route";
import { connectDatabase } from "./config/database";
import dotenv from "dotenv";

const app = express();

dotenv.config();
app.use(cors());
app.use(bodyParser.json({ limit: "2mb" }));

connectDatabase();

app.use("/api", authRouter);

const { PORT } = process.env;

app.listen(PORT, () => console.log("Server is running..."));
