import express from "express";
import clientRegister from "../controller/clientRegister.js";
import upload from "../utils/cloudinaryConfig.js";
const router = express.Router();

router.post("/register", upload.single("image"), clientRegister.register);
router.post("/verify", clientRegister.verifyCode);
router.post("/login", clientRegister.login);

export default router;