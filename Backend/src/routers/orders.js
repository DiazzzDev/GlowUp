import express from "express";
import ordersController from "../controller/orders.js";

const router = express.Router();

router.route("/")
    .get(ordersController.getOrders)
    .post(ordersController.createOrder);

router.route("/:id")
    .get(ordersController.getOrderById)
    .put(ordersController.updateOrder)
    .delete(ordersController.deleteOrder);

export default router;