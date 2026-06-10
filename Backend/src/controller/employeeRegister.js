import employeeModel from "../model/employee.js";
import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import crypto from "crypto";
import nodemailer from "nodemailer";
import { config } from "../../config.js";

const employeeRegisterController = {};

employeeRegisterController.register = async (req, res) => {
    try {
        const registerData = JSON.parse(req.body.employee);

        const { firstName, lastName, dui, phone, email, password } = registerData;

        const image = req.file?.path || null;
        const publicId = req.file?.filename || null;

        const existsEmployee = await employeeModel.findOne({
            $or: [{ email }, { dui }]
        });

        if (existsEmployee) {
            if (existsEmployee.email === email) {
                return res.status(400).json({ message: "Correo electrónico duplicado, este correo ya existe en el sistema" });
            }

            if (existsEmployee.dui === dui) {
                return res.status(400).json({ message: "DUI duplicado, este DUI ya existe en el sistema" });
            }
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
                password: hash,
                image,
                publicId
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

        return res.status(200).json({ message: "Código de verificación enviado al correo" });

    } catch (error) {
        console.error("Error: " + error);
        return res.status(500).json({ message: "Error del servidor" });
    }
};

employeeRegisterController.verifyCode = async (req, res) => {
    try {
        const { verification } = req.body;
        const token = req.cookies.registerCookie;

        if (!token) {
            return res.status(400).json({ message: "La sesión de registro expiró" });
        }

        const decode = jsonwebtoken.verify(token, config.jwt.SECRET_KEY);

        if (verification !== decode.verifyCode) {
            return res.status(400).json({ message: "Código de verificación inválido" });
        }

        const {
            firstName,
            lastName,
            dui,
            phone,
            email,
            password,
            image,
            publicId
        } = decode;

        const newEmployee = new employeeModel({
            firstName,
            lastName,
            dui,
            phone,
            email,
            password,
            image,
            publicId,
            status: "Active",
            isVerified: true,
            loginAttempts: 0,
            lockUntil: null
        });

        await newEmployee.save();

        res.clearCookie("registerCookie");

        return res.status(201).json({ message: "Registro completado con éxito" });

    } catch (error) {
        console.error("Error: " + error);
        return res.status(500).json({ message: "Error del servidor" });
    }
};

export default employeeRegisterController;
