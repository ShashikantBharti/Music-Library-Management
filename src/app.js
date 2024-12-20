import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Import Routes
import albumRouter from "./routes/albumRouter.js";
import artistRouter from "./routes/artistRouter.js";
import favoriteRouter from "./routes/favoriteRouter.js";
import trackRouter from "./routes/trackRouter.js";
import userRouter from "./routes/userRouter.js";

// Declare Routes
app.use("/api/v1", albumRouter);
app.use("/api/v1", artistRouter);
app.use("/api/v1", favoriteRouter);
app.use("/api/v1", trackRouter);
app.use("/api/v1", userRouter);

export default app;
