import customerModel from "../model/customer.js";
import bcrypt from "bcryptjs";
import { EMAIL_PATTERN, validateCustomer } from "../utils/validation.js";

const customerController = {};

customerController.getAllCustomers = async (req, res) => {
    try {
        const customers = await customerModel.find();
        return res.status(200).json(customers);
    } catch (error) {
        console.error("Error: " + error);
        return res.status(500).json({ message: "Error del servidor" });
    }
};

customerController.getCustomerById = async (req, res) => {
    try {
        const { id } = req.params;
        const customer = await customerModel.findById(id);

        if (!customer) {
            return res.status(404).json({ message: "Cliente no encontrado" });
        }

        return res.status(200).json(customer);
    } catch (error) {
        console.error("Error: " + error);
        return res.status(500).json({ message: "Error del servidor" });
    }
};

customerController.createCustomer = async (req, res) => {
    try {
        const customerData = req.body.customer
            ? JSON.parse(req.body.customer)
            : req.body;

        const {
            firstName,
            lastName,
            phone,
            email,
            password,
            status
        } = customerData;

        const validationError = validateCustomer({ firstName, lastName, phone, email, password });
        if (validationError) return res.status(400).json({ message: validationError });

        const image = req.file?.path || null;
        const publicId = req.file?.filename || null;

        const emailLower = email.toLowerCase().trim();

        const existsCustomer = await customerModel.findOne({ email: emailLower });

        if (existsCustomer) {
            return res.status(400).json({
                message: "Correo electrónico duplicado, este correo ya existe en el sistema"
            });
        }

        const hash = await bcrypt.hash(password, 10);

        const newCustomer = new customerModel({
            image,
            publicId,
            firstName,
            lastName,
            phone,
            email: emailLower,
            password: hash,
            status: status || "Active",
            isVerified: true,
            loginAttempts: 0,
            lockUntil: null
        });

        await newCustomer.save();

        return res.status(201).json({
            message: "Cliente creado con éxito",
            customer: newCustomer
        });

    } catch (error) {
        console.error("Error: " + error);
        return res.status(500).json({ message: "Error del servidor" });
    }
};

customerController.updateCustomer = async (req, res) => {
    try {
        const { id } = req.params;

        const existingCustomer = await customerModel.findById(id);

        if (!existingCustomer) {
            return res.status(404).json({ message: "Cliente no encontrado" });
        }

        const customerData = req.body.customer ? JSON.parse(req.body.customer) : req.body;
        const allowed = ["firstName", "lastName", "phone", "email", "image"];
        const update = Object.fromEntries(Object.entries(customerData).filter(([key, value]) => allowed.includes(key) && String(value || "").trim()));
        if (update.email && !EMAIL_PATTERN.test(update.email.trim())) return res.status(400).json({ message: "El correo electrónico no es válido" });
        if (req.file) { update.image = req.file.path; update.publicId = req.file.filename; }
        const updatedCustomer = await customerModel.findByIdAndUpdate(id, update, { new: true, runValidators: true });

        if (!updatedCustomer) {
            return res.status(404).json({ message: "Cliente no encontrado" });
        }

        return res.status(200).json(updatedCustomer);
    } catch (error) {
        console.error("Error: " + error);
        return res.status(500).json({ message: "Error del servidor" });
    }
};

customerController.deleteCustomer = async (req, res) => {
    try {
        const { id } = req.params;

        const existingCustomer = await customerModel.findById(id);

        if (!existingCustomer) {
            return res.status(404).json({ message: "Cliente no encontrado" });
        }

        await customerModel.findByIdAndDelete(id);

        return res.status(200).json({ message: "Cliente eliminado" });
    } catch (error) {
        console.error("Error: " + error);
        return res.status(500).json({ message: "Error del servidor" });
    }
};

export default customerController;
