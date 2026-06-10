import express from "express";
import productController from "../controller/product.js";
import upload from "../utils/cloudinaryConfig.js";
const router = express.Router();

router.route("/")
    .get(productController.getAllProducts)
    .post(upload.single("image"), productController.postProduct);

router.route("/:id")
    .get(productController.getProductById)
    .put(upload.single("image"), productController.updateProduct)
    .delete(productController.deleteProduct);

export default router;