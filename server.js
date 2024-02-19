import express from "express";
import * as http from "http";
import { Server } from "socket.io";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import uploadTrack from "./routes/uploadTrack.js";
import saveToDb from "./routes/saveToDb.js";
import getMetaData from "./routes/getMetaData.js";
import isTrackInDb from "./routes/isTrackInDb.js"
import getPlaylistsAndCollection from "./routes/getPlaylistsAndCollection.js"
import uploadMultipleTracks from "./routes/uploadMultipleTracks.js"


const app = express();
const PORT = process.env.PORT || 3030;

// const PORT = 3030
app.use(cors({
  origin: "http://localhost:3000",
  // origin: "https://dj-b2b-client.vercel.app",
  methods: ["GET", "POST"],
}));
app.use(
  express.json({
    limit: "50mb",
  })
);




dotenv.config();
mongoose.connect(process.env.MONGODB_URI);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    // origin: "http://localhost:3000",
    origin: "https://dj-b2b-client.vercel.app",
    methods: ["GET", "POST"],
  },
});

app.use("/routes/getPlaylistsAndCollection", getPlaylistsAndCollection)
app.use("/routes/uploadTrack", uploadTrack);
app.use("/routes/uploadMultipleTracks", uploadMultipleTracks);
app.use("/routes/getMetaData", getMetaData);
app.use("/routes/saveToDb", saveToDb);
app.use("/routes/IsTrackInDb", isTrackInDb)
app.post("/loadTrack", (request, response) => {
  const fileName = request.body.name;
  console.log(fileName);
});

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  // socket.on("join_room", )

  socket.on("send_controlInput", (data) => {
    socket.broadcast.emit("receive_controlInput", data);
  });

  socket.on("send_Gain", (data) => {
    socket.broadcast.emit("receive_Gain", data);
  });

  socket.on("send_playPause", (data) => {
    console.log(data);
    socket.broadcast.emit("receive_playPause", data);
  });

  socket.on("send_Cue", (data) => {
    console.log(data);
    socket.broadcast.emit("receive_Cue", data);
  });
});

app.get("/", (request, response) => {
  response.json({message: "h3llo"})
})


// app.post("/saveTrackToDb", saveToDb (request, response))

// var picture = tags.tags.picture; // create reference to track art
// var base64String = "";
// for (var i = 0; i < picture.data.length; i++) {
//     base64String += String.fromCharCode(picture.data[i]);
// }

// const encodedString = Buffer.from(base64String).toString('base64')

// const imageUri = "data:" + picture.format + ";base64," + encodedString

server.listen(PORT, "0.0.0.0", () => {
  console.log("Server is running on 3030");
});
