import express from "express";
import employeeRegisterController from "../controller/employeeRegister.js";
import upload from "../utils/cloudinaryConfig.js";
const router = express.Router();

router.post("/register", upload.single("image"), employeeRegisterController.register);
router.post("/verify", employeeRegisterController.verifyCode);

export default router;
