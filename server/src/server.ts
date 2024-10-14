import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import { router as authRouter } from "./routes/auth.route";
import { connectDatabase } from "./config/database";

const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: "2mb" }));
app.use(morgan("dev"));
connectDatabase();

app.use("/api", authRouter);

app.listen(8080, () => console.log("Server is running..."));
