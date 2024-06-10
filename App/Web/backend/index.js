import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { UserRouter } from "./routes/user.js";
import { TodoRouter } from "./routes/todo-list.js";
import { Patient } from "./models/Patient.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { Server } from "socket.io";
import { Types } from "mongoose";

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
  console.log("a user connected ");

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("join room", (userId) => {
    socket.join(userId);
    console.log("User joined room:", userId);
  });
  socket.on("msg", (msg) => {
    console.log("message: " + msg);
  });

  socket.on("locationUpdate", ({ longitude, latitude }) => {
    console.log("latitude: " + latitude);
    console.log("longitude: " + longitude);
    socket.broadcast.emit("patientLoc", { lng: longitude, lat: latitude });
  });

  socket.on("chat message", async (msg, room) => {
    let patientX = await Patient.findOne({ _id: room });
    let user = {id: msg[0].user._id, avatar: msg[0].user.avatar };
    patientX.messages.push({
      text: msg[0].text,
      user: user,
      createdAt: msg[0].createdAt,
    });
    await patientX.save();

    // {
    //   text: 'Hello',
    //   user: { _id: '66539226e6ab7c1ee63acd04', avatar: 7 },
    //   createdAt: '2024-06-03T12:23:54.249Z',
    //   _id: '49ee0ae1-09de-43e8-8de5-b160f0b8b5a2'
    // }

    console.log("message:", msg[0].text);
    // Broadcast message to all clients in the room
    io.to(room).emit("chat message", msg);
  });
});
