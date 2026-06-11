import clientModel from "../model/client.js";
import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import crypto from "crypto";
import nodemailer from "nodemailer";
import { config } from "../../config.js";

const clientRegister = {};

clientRegister.register = async (req, res) => {
    try {
        const registerData = JSON.parse(req.body.client);
        const { firstName, lastName, phone, email, password } = registerData;

        const image = req.file?.path || null;
        const publicId = req.file?.filename || null;

        // Normalizamos correo
        const emailLower = email.toLowerCase().trim();
        const existsClient = await clientModel.findOne({ email: emailLower });

        if (existsClient) {
            return res.status(400).json({ message: "Correo electrónico duplicado, este correo ya existe" });
        }

        const hash = await bcrypt.hash(password, 10);
        const verifyCode = crypto.randomBytes(3).toString("hex");

        const token = jsonwebtoken.sign(
            { verifyCode, firstName, lastName, phone, email: emailLower, password: hash, image, publicId },
            config.jwt.SECRET_KEY,
            { expiresIn: "15m" }
        );

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: config.mail.MAIL_USER,
                pass: config.mail.MAIL_PASS
            }
        });

        const mailOptions = {
            from: config.mail.MAIL_USER,
            to: emailLower,
            subject: "Código de verificación para registro de Cliente",
            text: `Su código de verificación es: ${verifyCode}`
        };

        await transporter.sendMail(mailOptions);
        
        return res.status(200).json({ message: "Código de verificación enviado al correo", token: token });

    } catch (error) {
        console.error("Error en registro: " + error);
        return res.status(500).json({ message: "Error del servidor" });
    }
};

clientRegister.verifyCode = async (req, res) => {
    try {
        const { verification } = req.body;
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(400).json({ message: "La sesión de registro expiró" });
        }

        const decode = jsonwebtoken.verify(token, config.jwt.SECRET_KEY);

        if (verification !== decode.verifyCode) {
            return res.status(400).json({ message: "Código de verificación inválido" });
        }

        const { firstName, lastName, phone, email, password, image, publicId } = decode;

        const newClient = new clientModel({
            firstName, lastName, phone, email, password, image, publicId,
            status: "Active",
            isVerified: true
        });

        await newClient.save();

        return res.status(201).json({ message: "Registro completado con éxito" });

    } catch (error) {
        console.error("Error en verificación: " + error);
        return res.status(500).json({ message: "Error del servidor" });
    }
};

clientRegister.login = async (req, res) => {
    try {
        const email = req.body.email.toLowerCase().trim();
        const { password } = req.body;
        
        const client = await clientModel.findOne({ email });

        if (!client) {
            return res.status(400).json({ message: "Correo o contraseña incorrectos" });
        }

        const isMatch = await bcrypt.compare(password, client.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Correo o contraseña incorrectos" });
        }

        return res.status(200).json({
            firstName: client.firstName,
            lastName: client.lastName,
            email: client.email,
            phone: client.phone,
            image: client.image
        });
    } catch (error) {
        console.error("Error en login: " + error);
        return res.status(500).json({ message: "Error del servidor" });
    }
};

export default clientRegister;