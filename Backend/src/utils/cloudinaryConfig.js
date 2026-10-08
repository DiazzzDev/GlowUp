import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { config } from "../../config.js";

//#1- Configuramos cloudinary con nuestras credenciales
cloudinary.config({
  cloud_name: config.cloudinary.CLOUDINARY_NAME,
  api_key: config.cloudinary.CLOUDINARY_API_KEY,
  api_secret: config.cloudinary.CLOUDINARY_API_SECRET,
});

//#2- Como guardamos las imágenes
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "GlowUp",
    allowed_formats: ["jpg", "png", "jpeg", "pdf", "doc"],
  },
});



//#3- configurar multer
const upload = multer({ storage });

export default upload;