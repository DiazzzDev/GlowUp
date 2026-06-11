import customerModel from "../model/customer.js";
import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import crypto from "crypto";
import nodemailer from "nodemailer";
import { config } from "../../config.js";

const customerAuth = {};

customerAuth.register = async (req, res) => {
    try {
        const registerData = JSON.parse(req.body.customer);

        const {
            firstName,
            lastName,
            phone,
            email,
            password
        } = registerData;

        const image = req.file?.path || null;
        const publicId = req.file?.filename || null;

        const emailLower = email.toLowerCase().trim();

        const existsCustomer = await customerModel.findOne({ email: emailLower });

        if (existsCustomer) {
            return res.status(400).json({
                message: "Correo electrónico duplicado, este correo ya existe"
            });
        }

        const hash = await bcrypt.hash(password, 10);

        const verifyCode = crypto.randomBytes(3).toString("hex");

        const token = jsonwebtoken.sign(
            {
                verifyCode,
                firstName,
                lastName,
                phone,
                email: emailLower,
                password: hash,
                image,
                publicId,
                isVerified: false,
                loginAttempts: 0,
                lockUntil: null
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
            to: emailLower,
            subject: "Código de verificación para registro de cliente",
            text: `Su código de verificación es: ${verifyCode}`
        };

        await transporter.sendMail(mailOptions);

        return res.status(200).json({
            message: "Código de verificación enviado al correo"
        });

    } catch (error) {
        console.error("Error en registro: " + error);
        return res.status(500).json({
            message: "Error del servidor"
        });
    }
};

customerAuth.verifyCode = async (req, res) => {
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
            phone,
            email,
            password,
            image,
            publicId
        } = decode;

        const existsCustomer = await customerModel.findOne({ email });

        if (existsCustomer) {
            return res.status(400).json({
                message: "El cliente ya existe en el sistema"
            });
        }

        const newCustomer = new customerModel({
            image,
            publicId,
            firstName,
            lastName,
            phone,
            email,
            password,
            status: "Active",
            isVerified: true,
            loginAttempts: 0,
            lockUntil: null
        });

        await newCustomer.save();

        res.clearCookie("registerCookie");

        return res.status(201).json({
            message: "Registro completado con éxito"
        });

    } catch (error) {
        console.error("Error en verificación: " + error);
        return res.status(500).json({
            message: "Error del servidor"
        });
    }
};

customerAuth.login = async (req, res) => {
    try {
        const { password } = req.body;
        const email = req.body.email.toLowerCase().trim();

        const customerFound = await customerModel.findOne({ email });

        if (!customerFound) {
            return res.status(400).json({
                message: "Correo o contraseña incorrectos"
            });
        }

        if (customerFound.lockUntil && customerFound.lockUntil > Date.now()) {
            return res.status(400).json({
                message: "El cliente está bloqueado temporalmente"
            });
        }

        const isMatch = await bcrypt.compare(password, customerFound.password);

        if (!isMatch) {
            customerFound.loginAttempts = (customerFound.loginAttempts || 0) + 1;

            if (customerFound.loginAttempts >= 3) {
                customerFound.lockUntil = new Date(Date.now() + 15 * 60 * 1000);
                customerFound.loginAttempts = 0;

                await customerFound.save();

                return res.status(400).json({
                    message: "El cliente está bloqueado por 15 minutos"
                });
            }

            await customerFound.save();

            return res.status(400).json({
                message: "Contraseña incorrecta"
            });
        }

        customerFound.loginAttempts = 0;
        customerFound.lockUntil = null;

        await customerFound.save();

        const token = jsonwebtoken.sign(
            {
                id: customerFound._id,
                userType: "customer"
            },
            config.jwt.SECRET_KEY,
            { expiresIn: "15m" }
        );

        res.cookie("authCookie", token, {
            httpOnly: true,
            maxAge: 15 * 60 * 1000
        });

        return res.status(200).json({
            message: "Login exitoso",
            customer: {
                id: customerFound._id,
                image: customerFound.image,
                publicId: customerFound.publicId,
                firstName: customerFound.firstName,
                lastName: customerFound.lastName,
                email: customerFound.email,
                phone: customerFound.phone,
                status: customerFound.status
            }
        });

    } catch (error) {
        console.error("Error en login: " + error);
        return res.status(500).json({
            message: "Error del servidor"
        });
    }
};

export default customerAuth;