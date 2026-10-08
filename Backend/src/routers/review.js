import express from "express";
import reviewController from "../controller/review.js";

const router = express.Router();
router.get("/product/:productId", reviewController.getByProduct);
router.post("/", reviewController.create);
export default router;
