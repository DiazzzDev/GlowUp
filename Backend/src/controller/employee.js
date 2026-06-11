import employeeModel from "../model/employee.js";
import bcrypt from "bcryptjs";

const employeeController = {};

employeeController.getAllEmployees = async (req, res) => {
    try {
        const employees = await employeeModel.find();
        return res.status(200).json(employees);
    } catch (error) {
        console.error("Error: " + error);
        return res.status(500).json({ message: "Error del servidor" });
    }
};

employeeController.getEmployeeById = async (req, res) => {
    try {
        const { id } = req.params;
        const employee = await employeeModel.findById(id);

        if (!employee) {
            return res.status(404).json({ message: "Empleado no encontrado" });
        }

        return res.status(200).json(employee);
    } catch (error) {
        console.error("Error: " + error);
        return res.status(500).json({ message: "Error del servidor" });
    }
};

employeeController.createEmployee = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            dui,
            phone,
            email,
            password,
            status
        } = req.body;

        const existsEmployee = await employeeModel.findOne({
            $or: [{ email }, { dui }]
        });

        if (existsEmployee) {
            if (existsEmployee.email === email) {
                return res.status(400).json({
                    message: "Correo electrónico duplicado, este correo ya existe en el sistema"
                });
            }

            if (existsEmployee.dui === dui) {
                return res.status(400).json({
                    message: "DUI duplicado, este DUI ya existe en el sistema"
                });
            }
        }

        const hash = await bcrypt.hash(password, 10);

        const newEmployee = new employeeModel({
            firstName,
            lastName,
            dui,
            phone,
            email,
            password: hash,
            status: status || "Active",
            isVerified: true,
            loginAttempts: 0,
            lockUntil: null
        });

        await newEmployee.save();

        return res.status(201).json({
            message: "Empleado creado con éxito",
            employee: newEmployee
        });

    } catch (error) {
        console.error("Error: " + error);
        return res.status(500).json({ message: "Error del servidor" });
    }
};

employeeController.updateEmployee = async (req, res) => {
    try {
        const { id } = req.params;

        const existingEmployee = await employeeModel.findById(id);

        if (!existingEmployee) {
            return res.status(404).json({ message: "Empleado no encontrado" });
        }

        const updatedEmployee = await employeeModel.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        );

        if (!updatedEmployee) {
            return res.status(404).json({ message: "Empleado no encontrado" });
        }

        return res.status(200).json(updatedEmployee);
    } catch (error) {
        console.error("Error: " + error);
        return res.status(500).json({ message: "Error del servidor" });
    }
};

employeeController.deleteEmployee = async (req, res) => {
    try {
        const { id } = req.params;

        const existingEmployee = await employeeModel.findById(id);

        if (!existingEmployee) {
            return res.status(404).json({ message: "Empleado no encontrado" });
        }

        await employeeModel.findByIdAndDelete(id);

        return res.status(200).json({ message: "Empleado eliminado" });
    } catch (error) {
        console.error("Error: " + error);
        return res.status(500).json({ message: "Error del servidor" });
    }
};

export default employeeController;