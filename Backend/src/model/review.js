import { Schema, model } from "mongoose";

const reviewSchema = new Schema({
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true, index: true },
    customerId: { type: Schema.Types.ObjectId, ref: "Customer", required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true, trim: true, maxlength: 1000 }
}, { timestamps: true, strict: true });

reviewSchema.index({ productId: 1, customerId: 1 }, { unique: true });

export default model("Review", reviewSchema);
