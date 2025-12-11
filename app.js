import express from "express";
import cors from "cors";
import authRouter from "./routes/auth-router.js";
import applicationRouter from "./routes/application-router.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/users", authRouter);
app.use("/api", applicationRouter);

export default app;
