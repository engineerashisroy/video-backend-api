import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET, // Click 'View Credentials' below to copy your API secret
// });
// const uploadOnCloudinary = async (localFilePath) => {
//   try {
//     if (!localFilePath) return null;
//     //upload file on cloudinary
//     const response = await cloudinary.uploader.upload(localFilePath, {
//       resource_type: "auto",
//     });
//     //file has been uploaded successfully
//     console.log("file is uploaded on cloudinary", response.url);
//     return response;
//   } catch (error) {
//     fs.unlinkSync(localFilePath); //remove the locally saved temporary as the upload operation got failed
//     return null;
//   }
// };

const uploadOnCloudinary = async (localFilePath) => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET, // Click 'View Credentials' below to copy your API secret
    });

    // Upload an image
    const response = await cloudinary.uploader
      .upload(localFilePath, {
        public_id: "images",
        resource_type: "auto",
      })
      .catch((error) => {
        fs.unlinkSync(localFilePath);
        console.log(error);
        return null;
      });

    console.log(response);

    // Optimize delivery by resizing and applying auto-format and auto-quality
    const optimizeUrl = cloudinary.url(localFilePath, {
      fetch_format: "auto",
      quality: "auto",
    });

    console.log(optimizeUrl);

    // Transform the image: auto-crop to square aspect_ratio
    const autoCropUrl = cloudinary.url(localFilePath, {
      crop: "auto",
      gravity: "auto",
      width: 500,
      height: 500,
    });

    console.log(autoCropUrl);
    return response;
  } catch (error) {
    console.log(error);
  }
};
export { uploadOnCloudinary };
// (async function (localFilePath) {
//   // Configuration
//   cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET, // Click 'View Credentials' below to copy your API secret
//   });

//   // Upload an image
//   const uploadOnCloudinary = await cloudinary.uploader
//     .upload(localFilePath, {
//       public_id: "shoes",
//     })
//     .catch((error) => {
//       fs.unlinkSync(localFilePath);
//       console.log(error);
//       return null;
//     });

//   console.log(uploadOnCloudinary);

//   // Optimize delivery by resizing and applying auto-format and auto-quality
//   const optimizeUrl = cloudinary.url("shoes", {
//     fetch_format: "auto",
//     quality: "auto",
//   });

//   console.log(optimizeUrl);

//   // Transform the image: auto-crop to square aspect_ratio
//   const autoCropUrl = cloudinary.url("shoes", {
//     crop: "auto",
//     gravity: "auto",
//     width: 500,
//     height: 500,
//   });

//   console.log(autoCropUrl);

// })();
