import express from "express";
import Track from "../models/trackSchema.js";
import mongoose from "mongoose";

mongoose.connect(process.env.MONGODB_URI);

const router = express.Router();

router.post("/", async (request, response) => {
    const id = request.body.id;
    console.log("ID: ", id);

    try {
        const track = await Track.find({ trackID: id });
      
        if (track.length === 0) {
          console.log("NO TRACK");
          response.json({ message: "no track in Db" });
        } else {
          response.json({ track: track[0] });
        }
    } catch (error) {
        console.log("Error in isTrackInDb: ", error)
    }

  });

  export default router