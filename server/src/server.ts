import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";

const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: "2mb" }));
app.use(morgan("dev"));

app.listen(8080, () => console.log("Server is running..."));

app.get("/api/hello", (_, res) => {
  res.send("Hello");
});
