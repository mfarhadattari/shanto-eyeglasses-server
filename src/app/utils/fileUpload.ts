import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import streamifier from 'streamifier';
import config from '../config';

// multer file parsing
export const upload = multer();

cloudinary.config(config.CLOUDINARY_CONFIG);

// cloudinary file uploading
export const uploadFileIntoCloud = (file: any) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream((error, result) => {
      if (result) {
        resolve(result);
      } else {
        reject(error);
      }
    });
    streamifier.createReadStream(file.buffer).pipe(stream);
  });
};
