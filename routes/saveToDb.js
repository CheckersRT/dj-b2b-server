import Track from "../models/trackSchema.js";
import express from "express";

const router = express.Router();

router.post("/", async (request, response) => {
  try {
    const metaData = request.body.metaData;
    console.log("Metadata from request body: ", metaData);
    const track = new Track(metaData);
    track.save();
    console.log("One entry added");
  } catch (error) {
    console.log("Error from saveToDb: ", error);
  }
});

export default router;
