import express from "express";
import * as http from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

// socket.on("join_room", )

  socket.on("send_controlInput", (data) => {
    socket.broadcast.emit("receive_controlInput", data)
  })

  socket.on("send_controlGain", (data) => {
    socket.broadcast.emit("receive_controlGain", data)
  })
  
  socket.on("send_playPause", (data) => {
    console.log(data)
    socket.broadcast.emit("receive_playPause", data)
  })

  socket.on("send_Cue", (data) => {
    console.log(data)
    socket.broadcast.emit("receive_Cue", data)
  })

});

server.listen(3001, () => {
  console.log("Server is running on 3001");
});
