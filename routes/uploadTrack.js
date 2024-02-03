import getTrackFromJSON from "../utils/getTrackFromJSON.js";
import uploadToCloudinary from "../utils/uploadToCloudinary.js";
import getMetaData from "../middleware/getMetaData.js"
import saveToDb from "../utils/saveToDb.js";
import express from "express"


const router = express.Router()


router.post("/", async (request, response) => {
    const trackName = request.body.trackName;
    const track = getTrackFromJSON(trackName);
    const location = track.Location;
    const trackPathNoSpace = decodeURI(location).slice(16);
    console.log(trackPathNoSpace);

    try {
      
      const data = await uploadToCloudinary(trackPathNoSpace);
      
      console.log("data from upload function", data);
      response.json(data)
    } catch (error) {
      console.log("error from trackupload: ", error)
      
    }
  }
  
//   , (request, response, next) => {
//     console.log(response)
//     const metaData = getMetaData(url)
//     console.log(metaData)
//     response.json(metaData);
//     next()
//   }, (request, response, next, metaData) => {
//     saveToDb(request, response, metaData)
//   }
  );

 export default router