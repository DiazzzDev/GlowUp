import employeeModel from "../model/employee.js";
import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import crypto from "crypto";
import nodemailer from "nodemailer";
import { config } from "../../config.js";

const employeeRegisterController = {};

employeeRegisterController.register = async (req, res) => {
    try {
        const { firstName, lastName, dui, phone, email, password } = req.body;

        const existsEmail = await employeeModel.findOne({ email });

        if (existsEmail) {
            return res.status(400).json({
                message: "Correo electrónico duplicado, este correo ya existe en el sistema"
            });
        }

        const existsDui = await employeeModel.findOne({ dui });

        if (existsDui) {
            return res.status(400).json({
                message: "DUI duplicado, este DUI ya existe en el sistema"
            });
        }

        const hash = await bcrypt.hash(password, 10);

        const verifyCode = crypto.randomBytes(3).toString("hex");

        const token = jsonwebtoken.sign(
            {
                verifyCode,
                firstName,
                lastName,
                dui,
                phone,
                email,
                password: hash
            },
            config.jwt.SECRET_KEY,
            { expiresIn: "15m" }
        );

        res.cookie("registerCookie", token, {
            maxAge: 15 * 60 * 1000,
            httpOnly: true
        });

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: config.mail.MAIL_USER,
                pass: config.mail.MAIL_PASS
            }
        });

        const mailOptions = {
            from: config.mail.MAIL_USER,
            to: email,
            subject: "Código de verificación para registro",
            text: `Su código de verificación es: ${verifyCode}`
        };

        await transporter.sendMail(mailOptions);

        return res.status(200).json({
            message: "Código de verificación enviado al correo"
        });

    } catch (error) {
        console.error("Error: " + error);
        return res.status(500).json({
            message: "Error del servidor"
        });
    }
};

employeeRegisterController.verifyCode = async (req, res) => {
    try {
        const { verification } = req.body;
        const token = req.cookies.registerCookie;

        if (!token) {
            return res.status(400).json({
                message: "La sesión de registro expiró"
            });
        }

        const decode = jsonwebtoken.verify(token, config.jwt.SECRET_KEY);

        if (verification !== decode.verifyCode) {
            return res.status(400).json({
                message: "Código de verificación inválido"
            });
        }

        const {
            firstName,
            lastName,
            dui,
            phone,
            email,
            password
        } = decode;

        const newEmployee = new employeeModel({
            firstName,
            lastName,
            dui,
            phone,
            email,
            password,
            status: "Active",
            isVerified: true,
            loginAttempts: 0,
            lockUntil: null
        });

        await newEmployee.save();

        res.clearCookie("registerCookie");

        return res.status(201).json({
            message: "Registro completado con éxito"
        });

    } catch (error) {
        console.error("Error: " + error);
        return res.status(500).json({
            message: "Error del servidor"
        });
    }
};

export default employeeRegisterController;