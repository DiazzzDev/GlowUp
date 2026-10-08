import employeeModel from "../model/employee.js";
import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import { config } from "../../config.js";

const employeeLoginController = {};

employeeLoginController.login = async (req, res) => {
    try {
        const { password } = req.body;

        const email = req.body.email.toLowerCase().trim();

        const employeeFound = await employeeModel.findOne({ email });

        if (!employeeFound) {
            return res.status(400).json({ message: "Correo o contraseña incorrectos" });
        }

        if (employeeFound.lockUntil && employeeFound.lockUntil > Date.now()) {
            return res.status(400).json({ message: "El empleado está bloqueado temporalmente" });
        }

        const isMatch = await bcrypt.compare(password, employeeFound.password);

        if (!isMatch) {
            employeeFound.loginAttempts = (employeeFound.loginAttempts || 0) + 1;

            if (employeeFound.loginAttempts >= 3) {
                employeeFound.lockUntil = new Date(Date.now() + 15 * 60 * 1000);
                employeeFound.loginAttempts = 0;

                await employeeFound.save();

                return res.status(400).json({ message: "El empleado está bloqueado por 15 minutos" });
            }

            await employeeFound.save();

            return res.status(400).json({ message: "Contraseña incorrecta" });
        }

        employeeFound.loginAttempts = 0;
        employeeFound.lockUntil = null;

        await employeeFound.save();

        const token = jsonwebtoken.sign(
            {
                id: employeeFound._id,
                userType: "employee"
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
            employee: {
                id: employeeFound._id,
                image: employeeFound.image,
                publicId: employeeFound.publicId,
                firstName: employeeFound.firstName,
                lastName: employeeFound.lastName,
                dui: employeeFound.dui,
                email: employeeFound.email,
                phone: employeeFound.phone,
                status: employeeFound.status
            }
        });

    } catch (error) {
        console.error("Error en login: " + error);
        return res.status(500).json({ message: "Error del servidor" });
    }
};

export default employeeLoginController;