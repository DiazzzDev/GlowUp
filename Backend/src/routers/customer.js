import express from "express";
import customerController from "../controller/customer.js";
import upload from "../utils/cloudinaryConfig.js";

const router = express.Router();

router.route("/")
    .get(customerController.getAllCustomers)
    .post(upload.single("image"), customerController.createCustomer);

router.route("/:id")
    .get(customerController.getCustomerById)
    .put(upload.single("image"), customerController.updateCustomer)
    .delete(customerController.deleteCustomer);

export default router;