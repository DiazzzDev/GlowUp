import clientModel from "../model/client.js";

const clientController = {};

clientController.getAllClients = async (req, res) => {
    try {
        const clients = await clientModel.find().select("-password");
        return res.status(200).json(clients);
    } catch (error) {
        console.error("Error: " + error);
        return res.status(500).json({ message: "Error del servidor" });
    }
};

clientController.getClientById = async (req, res) => {
    try {
        const { id } = req.params;
        const client = await clientModel.findById(id).select("-password");
        if (!client) {
            return res.status(404).json({ message: "Cliente no encontrado" });
        }
        return res.status(200).json(client);
    } catch (error) {
        console.error("Error: " + error);
        return res.status(500).json({ message: "Error del servidor" });
    }
};

clientController.updateClient = async (req, res) => {
    try {
        const { id } = req.params;
        const existingClient = await clientModel.findById(id);

        if (!existingClient) {
            return res.status(404).json({ message: "Cliente no encontrado" });
        }

        const updatedClient = await clientModel.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        ).select("-password");

        return res.status(200).json(updatedClient);
    } catch (error) {
        console.error("Error: " + error);
        return res.status(500).json({ message: "Error del servidor" });
    }
};

clientController.deleteClient = async (req, res) => {
    try {
        const { id } = req.params;
        const existingClient = await clientModel.findById(id);
        if (!existingClient) {
            return res.status(404).json({ message: "Cliente no encontrado" });
        }
        await clientModel.findByIdAndDelete(id);
        return res.status(200).json({ message: "Cliente eliminado" });
    } catch (error) {
        console.error("Error: " + error);
        return res.status(500).json({ message: "Error del servidor" });
    }
};

export default clientController;