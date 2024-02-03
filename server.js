import express from "express";
import * as http from "http";
import { Server } from "socket.io";
import cors from "cors";
import jsmediatags from "jsmediatags";
import { xml2js } from "xml-js";
import { readFileSync } from "fs";
import bodyParser from "body-parser";
import fs from "fs";
import uploadToCloudinary from "./utils/uploadToCloudinary.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Track from "./models/trackSchema.js";
import uploadTrack from "./routes/uploadTrack.js";
import saveToDb from "./routes/saveToDb.js";
import getMetaData from "./routes/getMetaData.js";
import isTrackInDb from "./routes/isTrackInDb.js"

const app = express();
const PORT = process.env.PORT || 3030;
app.use(cors());
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
  console.log(fileName);
});

app.post("/metadata", (request, response) => {
  console.log("Request.body: ", request.body.url);

  jsmediatags.read(request.body.url, {
    onSuccess: function (tag) {
      const tags = tag.tags;
      console.log(tag);
      //Create a buffer, stringify it and format it to a data url.
      const art = `data:${tags.picture.format};base64,${Buffer.from(
        tags.picture.data
      ).toString("base64")}`;

      response.status(200).json({
        url: request.body.url,
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

app.post(
  "/saveXML",
  bodyParser.raw({
    type: "text/xml",
    limit: "5mb",
  }),
  (request, response) => {
    // const xmlFile = request.body.file
    console.log(request.body);

    fs.writeFile("public/rekordboxTEST.xml", request.body, (error) => {
      if (error) console.log("Error writing file : ", error);
    });

    response.status(200).json({ message: "success" });
  }
);

app.get("/getPlaylists", (request, response) => {
  var xml = readFileSync(
    "/Users/Checkers/Documents/spiced/dj-b2b-server/public/rekordboxTEST.xml",
    "utf8"
  );
  var options = { ignoreComment: true, alwaysChildren: true };
  var result = xml2js(xml, options); // or convert.xml2json(xml, options)
  console.log(result);

  const resultJSON = JSON.stringify(result);

  fs.writeFile("public/rekordboxJSON.json", resultJSON, (error) => {
    if (error) console.log("Error writing file : ", error);
  });

  const playlists = result.elements[0].elements[2].elements[0].elements;

  console.log("Playlists: ", playlists);

  const playlistsArray = playlists.map((playlist) => playlist);
  console.log(playlistsArray);

  response.json(playlistsArray);
});

app.post("/getTracksInPlaylist", (request, response) => {
  console.log(request.body.playlistName);
  const playlistName = request.body.playlistName;

  const rekordboxFile = readFileSync(
    "/Users/Checkers/Documents/spiced/dj-b2b-server/public/rekordboxJSON.json"
  );
  const rekordboxJSON = JSON.parse(rekordboxFile);
  const playlists = rekordboxJSON.elements[0].elements[2].elements[0].elements;
  const playlistToGet = playlists.find(
    (playlist) => playlist.attributes.Name === playlistName
  );
  console.log("Playlist to get: ", playlistToGet.elements);
  const tracksInPlaylist = playlistToGet.elements.map(
    (track) => track.elements
  );

  const trackKeys = tracksInPlaylist[0].map((track) => track.attributes.Key);
  const collection = rekordboxJSON.elements[0].elements[1].elements;
  const trackList = [];
  for (let i = 0; i < trackKeys.length; i++) {
    const track = collection.find(
      (track) => track.attributes.TrackID === trackKeys[i]
    );

    // const trackID = track.attributes.ID
    // const trackName = track.attributes.Name;

    trackList.push(track.attributes);
  }

  const playlistObj = {
    playlistName: playlistName,
    trackList: trackList,
  };

  response.json(playlistObj);
});

app.use("/routes/uploadTrack", uploadTrack);
app.use("/routes/getMetaData", getMetaData);
app.use("/routes/saveToDb", saveToDb);
app.use("/routes/IsTrackInDb", isTrackInDb)

app.get("/", async (request, response) => {
  const tracks = await Track.find();
  response.json(tracks);
});

// app.post("/saveTrackToDb", saveToDb (request, response))

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
