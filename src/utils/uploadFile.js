import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

const cloudinaryFileUpload = async function (fileUploadPath) {
  try {
    if (!fileUploadPath) return null;

    const response = await cloudinary.uploader.upload(fileUploadPath, {
      resource_type: "auto",
    });

    console.log("File Uploaded Successfully on cloudinary:", response.url);
    return response;
  } catch (err) {
    fs.unlinkSync(fileUploadPath);
  }
};

export { cloudinaryFileUpload };
