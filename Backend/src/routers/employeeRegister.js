import express from "express";
import employeeRegisterController from "../controller/employeeRegister.js";
const router = express.Router();

router.post("/register", employeeRegisterController.register);
router.post("/verify", employeeRegisterController.verifyCode);

export default router;