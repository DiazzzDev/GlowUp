import express from "express";
import clientController from "../controller/client.js";
const router = express.Router();

router.route("/")
    .get(clientController.getAllClients);

router.route("/:id")
    .get(clientController.getClientById)
    .put(clientController.updateClient)
    .delete(clientController.deleteClient);

export default router;