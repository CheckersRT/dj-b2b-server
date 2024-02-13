import cloudinary from "cloudinary"
import dotenv from "dotenv";
import fs from "fs"

dotenv.config();

cloudinary.config({ 
  cloud_name: 'dm1n4kfee', 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});


export default async function uploadToCloudinary(trackPath) {
  
    // Use the uploaded file's name as the asset's public ID and 
    // allow overwriting the asset with new versions
    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: true,
      resource_type: "video",
    };


    try {
      // Upload the track
      const fileData = fs.readFileSync(trackPath);
      const result = await cloudinary.v2.uploader.upload(
        fileData,
        options);
      console.log("Result from try catch: ", result);
      return result;
    } catch (error) {
      console.error("Error from uploadToCloudinary", error);
      return "No such file or directory"
    }
    
};