import jsmediatags from "jsmediatags";
import express from "express";
import multer from "multer";
import fs from "fs"
import getMetaData from "../utils/getMetaData.js";

const router = express.Router();
const upload = multer();

router.post("/", upload.array("files"), async (request, response) => {

  try {
    const tracks = request.files;
    if (!tracks) {
      response.status(400).json({ message: "Tracks did not reach server" });
    }
    
    const metaDataPromises = tracks.map(async (track) => {
      // const filePath = `/metaData/${Date.now()}-${track.originalname}`;
      const filePath = `public/metaData/${Date.now()}-${track.originalname}`;
      fs.writeFileSync(filePath, track.buffer);
      
      const metaData = await getMetaData(filePath)
      
      fs.unlinkSync(filePath)
      
      return metaData
    });
    const metaDataArray = await Promise.all(metaDataPromises);
    
    response
    .status(200)
    .json({
      message: "Success",
      metaData: metaDataArray,
    });
  } catch (error) {
    console.error("Error in getMetaData route: ", error);

  }
  });
  
  export default router;
