import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { UserRouter } from "./routes/user.js";
import { TodoRouter } from "./routes/todo-list.js";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: [process.env.HOSTNAME],
    credentials: true,
  })
);
app.use(cookieParser());
app.use("/auth", UserRouter);
app.use("/todo", TodoRouter);
mongoose.connect(`${process.env.DATABASE_URI}/pfe`);

app.listen(process.env.PORT, () => {
  console.log(`Server started at http://localhost:${process.env.PORT}`);
});
