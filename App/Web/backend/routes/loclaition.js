import express from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { Server } from "socket.io";

const app = express(); // Create an Express application instance

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

const server = app.listen(4000, () => {
  console.log("server running at http://localhost:4000");
});

const io = new Server(server); // Pass the Express server instance to Socket.IO

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
  socket.on("chat message", (msg) => {
    console.log("message: " + msg.text);
  });
  socket.on("chat message", (msg) => {
    socket.broadcast.emit("chat message", msg);
  });
});
