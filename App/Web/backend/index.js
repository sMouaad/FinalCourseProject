import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { UserRouter } from "./routes/user.js";
import { TodoRouter } from "./routes/todo-list.js";
import cors from "cors";
import cookieParser from "cookie-parser";

import { Server } from "socket.io";

dotenv.config();
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: [process.env.HOSTNAME],
    credentials: true,
  })
);
app.use(express.static("Images"));
app.use(cookieParser());
app.use("/auth", UserRouter);
app.use("/todo", TodoRouter);
mongoose.connect(`${process.env.DATABASE_URI}/pfe`);

const server = app.listen(process.env.PORT, () => {
  console.log(`Server started at http://localhost:${process.env.PORT}`);
  console.log(`Database connected at ${process.env.DATABASE_URI}`);
});

const io = new Server(server, {
  cors: {
    origin: [process.env.HOSTNAME],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("msg", (msg) => {
    console.log("message: " + msg);
  });

  socket.emit("gps", "Hello from the server!");
});
