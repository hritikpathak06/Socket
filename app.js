import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
const app = express();

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("user connected", socket.id);

  socket.on("message", ({ room, message }) => {
    // console.log(data);
    // socket.broadcast.emit("receive-message", data);
    socket.to(room).emit("receive-message", message);
  });

  socket.on("join-room", (room) => {
    socket.join(room);
    console.log(room);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected: ", socket.id);
  });
});

app.get("/", (req, res) => {
  res.send("Hello Ritik");
});

const users = true;

io.use((socket, next) => {
  if (users) next();
});

server.listen(5000, () => {
  console.log("Server Is Running on port: 5000");
});
