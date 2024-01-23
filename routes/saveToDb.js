import Track from "../models/trackSchema.js";
import express from "express"

const router = express.Router()

router.post("/", async (request, response) => {
    const metaData = request.body.metaData
    console.log(metaData)
    const track = new Track(metaData);
      track.save().then(
        () => console.log("One entry added"),
        (error) => console.log(error)
      );

})

export default router