import express from "express"
import multer from "multer"
import uploadMultipleToCloudinary from "../utils/uploadMultipleToCloudinary.js"

const router = express.Router()
const upload = multer()

router.post("/", upload.array("files"), async (request, response) => {

        try {
            const tracks = request.files
            console.log("Tracks from router: ", tracks)

            if(!tracks) {
                response.status(400).json({message: "Tracks did not reach server"})
            }

            const uploadPromises = tracks.map(track => uploadMultipleToCloudinary(track));

            const resultArray = await Promise.all(uploadPromises);
            console.log("ResultArray: ", resultArray);

            response.status(200).json({message: "Success", urls: resultArray.map(data => data.secure_url)})

        } catch (error) {
            console.error("Error in uploadMultiTrack route: ", error)
        }
    })

export default router