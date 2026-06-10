import orderModel from "../model/orders.js";
import productModel from "../model/products.js";
import customerModel from "../model/customer.js";

const orderController = {};

const generateOrderNumber = async () => {
    let orderNumber;
    let existsOrder = true;

    while (existsOrder) {
        const randomNumber = Math.floor(10000 + Math.random() * 90000);
        orderNumber = `N°${randomNumber}`;

        existsOrder = await orderModel.findOne({ orderNumber });
    }

    return orderNumber;
};

// Obtener todos los pedidos
orderController.getOrders = async (req, res) => {
    try {
        const orders = await orderModel.find()
            .populate("customerId", "firstName lastName email phone")
            .populate("products.productId", "productName brand price image");

        return res.status(200).json(orders);
    } catch (error) {
        console.error("Error: " + error);
        return res.status(500).json({ message: "Error del servidor" });
    }
};

// Obtener pedido por ID
orderController.getOrderById = async (req, res) => {
    try {
        const { id } = req.params;

        const order = await orderModel.findById(id)
            .populate("customerId", "firstName lastName email phone")
            .populate("products.productId", "productName brand price image");

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
            customerId,
            products,
            orderDate,
            deliveryDate,
            status
        } = req.body;

        const existsCustomer = await customerModel.findById(customerId);
        console.log(existsCustomer)

        if (!existsCustomer) {
            return res.status(404).json({ message: "Cliente no encontrado" });
        }

        if (!products || products.length === 0) {
            return res.status(400).json({ message: "Debe agregar al menos un producto" });
        }

        let total = 0;
        const productDetails = [];

        for (let i = 0; i < products.length; i++) {
            const productFound = await productModel.findById(products[i].productId);

            if (!productFound) {
                return res.status(404).json({
                    message: `Producto no encontrado: ${products[i].productId}`
                });
            }

            const quantity = products[i].quantity || 1;
            const price = productFound.price;

            total += price * quantity;

            productDetails.push({
                productId: products[i].productId,
                quantity,
                price
            });
        }

        const orderNumber = await generateOrderNumber();

        const newOrder = new orderModel({
            customerId,
            orderNumber,
            products: productDetails,
            orderDate,
            deliveryDate,
            status,
            total
        });

        await newOrder.save();

        return res.status(201).json({
            message: "Pedido creado con éxito",
            order: newOrder
        });

    } catch (error) {
        console.error("Error: " + error);
        return res.status(500).json({ message: "Error del servidor" });
    }
};

// Actualizar pedido
orderController.updateOrder = async (req, res) => {
    try {
        const { id } = req.params;

        const {
            customerId,
            products,
            orderDate,
            deliveryDate,
            status
        } = req.body;

        const existsCustomer = await customerModel.findById(customerId);

        if (!existsCustomer) {
            return res.status(404).json({ message: "Cliente no encontrado" });
        }

        if (!products || products.length === 0) {
            return res.status(400).json({ message: "Debe agregar al menos un producto" });
        }

        let total = 0;
        const productDetails = [];

        for (let i = 0; i < products.length; i++) {
            const productFound = await productModel.findById(products[i].productId);

            if (!productFound) {
                return res.status(404).json({
                    message: `Producto no encontrado: ${products[i].productId}`
                });
            }

            const quantity = products[i].quantity || 1;
            const price = productFound.price;

            total += price * quantity;

            productDetails.push({
                productId: products[i].productId,
                quantity,
                price
            });
        }

        const updatedOrder = await orderModel.findByIdAndUpdate(
            id,
            {
                customerId,
                products: productDetails,
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

        return res.status(200).json({
            message: "Pedido actualizado con éxito",
            order: updatedOrder
        });

    } catch (error) {
        console.error("Error: " + error);
        return res.status(500).json({ message: "Error del servidor" });
    }
};

// Eliminar pedido
orderController.deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedOrder = await orderModel.findByIdAndDelete(id);

        if (!deletedOrder) {
            return res.status(404).json({ message: "Pedido no encontrado" });
        }

        return res.status(200).json({
            message: "Pedido eliminado con éxito",
            order: deletedOrder
        });

    } catch (error) {
        console.error("Error: " + error);
        return res.status(500).json({ message: "Error del servidor" });
    }
};

export default orderController;