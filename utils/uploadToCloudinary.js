import cloudinary from "cloudinary"
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({ 
  cloud_name: 'dm1n4kfee', 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
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
      const result = await cloudinary.v2.uploader.upload(trackPath, options);
      console.log("Result from try catch: ", result);
      return result;
    } catch (error) {
      console.error(error);
    }
};