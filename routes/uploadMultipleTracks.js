import express from "express";
import multer from "multer";
import uploadMultipleToCloudinary from "../utils/uploadMultipleToCloudinary.js";
import fs from "fs"
import getMetaData from "../utils/getMetaData.js"
import createDbData from "../utils/createDbData.js";
import saveToDb from "../utils/saveToDb.js";

const router = express.Router();
const upload = multer();

router.post("/", upload.array("files"), async (request, response) => {
  try {
    const tracks = request.files;
    if (!tracks) {
      response.status(400).json({ message: "Tracks did not reach server" });
    }

    const uploadPromises = tracks.map(async (track)  => {
      // temp save the files
      const filePath = `public/${track.originalname}`;
      fs.writeFileSync(filePath, track.buffer);

      // get metaData from filePath
      const metaData = await getMetaData(filePath)
      //upload to cloudinary
      const cloudinaryResponse = await uploadMultipleToCloudinary(filePath);

      // create database doc object inline with Schema from metaData and upload response
      const dbData = await createDbData(metaData, cloudinaryResponse)
      console.log("DbData: ", dbData)

      // save the tracks in the db
      const document = await saveToDb(dbData)

      //remove temp files
      fs.unlinkSync(filePath)

      return document
    });

    const resultArray = await Promise.all(uploadPromises);
    console.log("ResultArray: ", resultArray);


    // save data to database

    //

    response
      .status(200)
      .json({
        message: "Success",
        tracks: resultArray,
      });
  } catch (error) {
    console.error("Error in uploadMultiTrack route: ", error);
  }
});

export default router;
