import express from "express";
import customerAuth from "../controller/customerAuth.js";
import upload from "../utils/cloudinaryConfig.js";

const router = express.Router();

router.post("/register", upload.single("image"), customerAuth.register);
router.post("/verify", customerAuth.verifyCode);
router.post("/login", customerAuth.login);

export default router;