import reviewModel from "../model/review.js";
import productModel from "../model/products.js";
import customerModel from "../model/customer.js";

const reviewController = {};

reviewController.getByProduct = async (req, res) => {
    try {
        const reviews = await reviewModel.find({ productId: req.params.productId })
            .populate("customerId", "firstName lastName image")
            .sort({ createdAt: -1 });
        const average = reviews.length ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length : 0;
        return res.json({ reviews, average, count: reviews.length });
    } catch (error) {
        return res.status(400).json({ message: "No se pudieron obtener las reseñas" });
    }
};

reviewController.create = async (req, res) => {
    try {
        const { productId, customerId, rating, comment } = req.body;
        if (!Number.isInteger(Number(rating)) || Number(rating) < 1 || Number(rating) > 5 || !String(comment || "").trim()) {
            return res.status(400).json({ message: "La valoración debe ser de 1 a 5 y el comentario es obligatorio" });
        }
        const [product, customer] = await Promise.all([productModel.findById(productId), customerModel.findById(customerId)]);
        if (!product || !customer) return res.status(404).json({ message: "Producto o cliente no encontrado" });
        const review = await reviewModel.findOneAndUpdate(
            { productId, customerId }, { rating: Number(rating), comment: comment.trim() }, { new: true, upsert: true, runValidators: true }
        );
        return res.status(201).json(review);
    } catch (error) {
        return res.status(400).json({ message: "No se pudo guardar la reseña" });
    }
};

export default reviewController;
