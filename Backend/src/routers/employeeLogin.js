import express from "express";
import employeeLoginController from "../controller/employeeLogin.js";
const router = express.Router();

router.post("/", employeeLoginController.login)

export default router;