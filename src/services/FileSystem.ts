import path from "path";
import ErrorHandler from "../utils/ErrorHandler";
import { v2 as cloudinary } from "cloudinary";
import { getFileName } from "../utils/helper";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_URL_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_URL_API_KEY,
  api_secret: process.env.CLOUDINARY_URL_SECRET_KEY,
});

/**
 * @description: Delete file
 * @param: publicId
 */
export const deleteFile = async (publicId) => {
  return cloudinary.uploader.destroy(publicId);
};

const fileUpload = async (file, location: string, publicId: string) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          resource_type: "auto",
          folder: location,
          overwrite: true,
          use_filename: true,
          public_id: publicId,
        },
        function onEnd(error, result) {
          if (error) {
            return reject(error);
          }
          resolve(result);
        }
      )
      .end(file);
  });
};

/**
 * @description: Handle Image Upload
 * @param:
 */
export const uploadFile = async (file, location: string, publicId: string) => {
  const filetypes = /jpeg|jpg|png|JPEG|JPG|PNG/;
  // Check ext
  const extname = filetypes.test(path.extname(file.name).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (!(mimetype && extname)) {
    throw new ErrorHandler("file type not supported", 400);
  }
  //
  if (file.size / 1000 > 3000) {
    throw new ErrorHandler("file too large", 400);
  }

  const uploadedImage: any = await fileUpload(file.data, location, publicId);

  return getFileName(uploadedImage.secure_url);
};
