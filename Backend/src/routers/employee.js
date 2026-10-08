import express from "express";
import employeeController from "../controller/employee.js";
const router = express.Router();

router.route("/")
    .get(employeeController.getAllEmployees)
    .post(employeeController.createEmployee);

router.route("/:id")
    .get(employeeController.getEmployeeById)
    .put(employeeController.updateEmployee)
    .delete(employeeController.deleteEmployee);

export default router;