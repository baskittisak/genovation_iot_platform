import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { connectDatabase } from "./config/database.config";
import { router as authRouter } from "./routes/auth.route";
import { router as deviceRouter } from "./routes/device.route";
import dotenv from "dotenv";

const app = express();

dotenv.config();
app.use(cors());
app.use(bodyParser.json({ limit: "2mb" }));

connectDatabase();

app.use("/api", authRouter);
app.use("/api", deviceRouter);

const { PORT } = process.env;

app.listen(PORT, () => console.log("Server is running..."));
