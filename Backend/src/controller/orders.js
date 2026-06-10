import orderModel from "../model/orders.js";

const orderController = {};

// Obtener todos los pedidos
orderController.getOrders = async (req, res) => {
    try {
        const orders = await orderModel.find()
            .populate("customer")
            .populate("products.product");

        return res.status(200).json(orders);
    } catch (error) {
        console.error("Error: " + error);
        return res.status(500).json({ message: "Error del servidor" });
    }
};

// Obtener pedido por ID
orderController.getOrderById = async (req, res) => {
    try {
        const order = await orderModel.findById(req.params.id)
            .populate("customer")
            .populate("products.product");

        if (!order) {
            return res.status(404).json({ message: "Pedido no encontrado" });
        }

        return res.status(200).json(order);
    } catch (error) {
        console.error("Error: " + error);
        return res.status(500).json({ message: "Error del servidor" });
    }
};

// Crear pedido
orderController.createOrder = async (req, res) => {
    try {
        const {
            customer,
            orderNumber,
            products,
            orderDate,
            deliveryDate,
            status,
            total
        } = req.body;

        const existsOrder = await orderModel.findOne({ orderNumber });

        if (existsOrder) {
            return res.status(400).json({ message: "Número de pedido duplicado, este pedido ya existe" });
        }

        const newOrder = new orderModel({
            customer,
            orderNumber,
            products,
            orderDate,
            deliveryDate,
            status,
            total
        });

        await newOrder.save();

        return res.status(201).json({ message: "Pedido creado con éxito", order: newOrder });
    } catch (error) {
        console.error("Error: " + error);
        return res.status(500).json({ message: "Error del servidor" });
    }
};

// Actualizar pedido
orderController.updateOrder = async (req, res) => {
    try {
        const {
            customer,
            orderNumber,
            products,
            orderDate,
            deliveryDate,
            status,
            total
        } = req.body;

        const existsOrder = await orderModel.findOne({
            orderNumber,
            _id: { $ne: req.params.id }
        });

        if (existsOrder) {
            return res.status(400).json({ message: "Número de pedido duplicado, este pedido ya existe" });
        }

        const updatedOrder = await orderModel.findByIdAndUpdate(
            req.params.id,
            {
                customer,
                orderNumber,
                products,
                orderDate,
                deliveryDate,
                status,
                total
            },
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({ message: "Pedido no encontrado" });
        }

        return res.status(200).json({ message: "Pedido actualizado con éxito", order: updatedOrder });
    } catch (error) {
        console.error("Error: " + error);
        return res.status(500).json({ message: "Error del servidor" });
    }
};

// Eliminar pedido
orderController.deleteOrder = async (req, res) => {
    try {
        const deletedOrder = await orderModel.findByIdAndDelete(req.params.id);

        if (!deletedOrder) {
            return res.status(404).json({ message: "Pedido no encontrado" });
        }

        return res.status(200).json({ message: "Pedido eliminado con éxito" });
    } catch (error) {
        console.error("Error: " + error);
        return res.status(500).json({ message: "Error del servidor" });
    }
};

export default orderController;