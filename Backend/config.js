import dotenv from "dotenv";

dotenv.config();

export const config = {
    port: {
        PORT: process.env.PORT,
    },
    db: {
        URI: process.env.DB_URI,
    },
    jwt: {
        SECRET_KEY: process.env.JWT_SECRET_KEY,
    },
    mail: {
        MAIL_USER: process.env.MAIL_USER,
        MAIL_PASS: process.env.MAIL_PASS,
    },
    cloudinary: {
        CLOUDINARY_NAME: process.env.CLOUDINARY_CLOUD_NAME,
        CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
        CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET
    }
};