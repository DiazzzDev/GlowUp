import { Schema, model } from "mongoose";

const productSchema = new Schema({
    image: { type: String, },

    public_id: { type: String, },

    productName: {
        type: String,
        required: true,
        trim: true
    },

    brand: {
        type: String,
        required: true,
        trim: true
    },

    category: {
        type: String,
        required: true,
        trim: true
    },

    subCategory: {
        type: String,
        required: true,
        trim: true
    },

    skinType: {
        type: String,
        required: true,
        trim: true
    },

    description: {
        type: String,
        required: true,
        trim: true
    },

    stock: {
        type: Number,
        required: true,
        default: 0
    },

    status: {
        type: String,
        enum: ["In Stock", "Out of Stock", "Discontinued"],
        default: "In Stock"
    },

    price: {
        type: Number,
        required: true
    }
}, {
    timestamps: true,
    strict: true
}
);

export default model("Product", productSchema);