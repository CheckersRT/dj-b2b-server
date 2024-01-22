import cloudinary from "cloudinary"

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
      // Upload the image
      const result = await cloudinary.v2.uploader.upload(trackPath, options);
      console.log("Result from try catch: ", result);
      return result.public_id;
    } catch (error) {
      console.error(error);
    }
};