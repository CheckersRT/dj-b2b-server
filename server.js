import express from "express";
import * as http from "http";
import { Server } from "socket.io";
import cors from "cors";
import jsmediatags from "jsmediatags";

const app = express();
const PORT = process.env.PORT || 3030;
app.use(cors());
app.use(express.json());


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



app.post("/loadTrack", (request, response) => {
  const fileName = request.body.name;
  console.log(fileName)


});

app.post("/metadata", (request, response) => {
  console.log("Request.body: ", request.body.url);

  jsmediatags.read(request.body.url, {
    onSuccess: function (tag) {
      const tags = tag.tags;
      //Create a buffer, stringify it and format it to a data url.
      const art = `data:${tags.picture.format};base64,${Buffer.from(
        tags.picture.data
      ).toString("base64")}`;

      response.status(200).json({
        artist: tags.artist,
        album: tags.album,
        title: tags.title,
        track: tags.track,
        art: art,
      });
    },
    onError: function (error) {
      console.log(":(", error.type, error.info);
    },
  });
});

// const result = getMetaDataFromFile(trackUri);
// console.log("Result: ", result);

// var picture = tags.tags.picture; // create reference to track art
// var base64String = "";
// for (var i = 0; i < picture.data.length; i++) {
//     base64String += String.fromCharCode(picture.data[i]);
// }

// const encodedString = Buffer.from(base64String).toString('base64')

// const imageUri = "data:" + picture.format + ";base64," + encodedString

server.listen(3030, () => {
  console.log("Server is running on 3030");
});
