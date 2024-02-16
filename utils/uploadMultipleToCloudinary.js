import cloudinary from "cloudinary";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

cloudinary.config({
  cloud_name: "dm1n4kfee",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export default async function uploadMultipleToCloudinary(file) {
  // Use the uploaded file's name as the asset's public ID and
  // allow overwriting the asset with new versions
  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: false,
    resource_type: "video",
  };

  try {
    const filePath = `public/${Date.now()}-${file.originalname}`;
    fs.writeFileSync(filePath, file.buffer);

    const result = await cloudinary.v2.uploader.upload(filePath, options);
    console.log("Result from uploadMultipleToCloudinary: ", result);

    fs.unlinkSync(filePath)

    return result;
  } catch (error) {
    console.error("Error from uploadMultipleToCloudinary", error);
    return error;
  }
}
