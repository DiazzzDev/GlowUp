import { Schema, model } from "mongoose";

const orderSchema = new Schema({
    customer: {
        type: Schema.Types.ObjectId,
        ref: "Customer",
        required: true
    },

    orderNumber: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    products: [
        {
            product: {
                type: Schema.Types.ObjectId,
                ref: "Product",
                required: true
            },

            quantity: {
                type: Number,
                required: true,
                default: 1
            },

            price: {
                type: Number,
                required: true
            }
        }
    ],

    orderDate: {
        type: Date,
        default: Date.now
    },

    deliveryDate: {
        type: Date,
        default: null
    },

    status: {
        type: String,
        enum: ["Pending", "Completed", "Cancelled"],
        default: "Pending"
    },

    total: {
        type: Number,
        required: true
    }
},
    {
        timestamps: true,
        strict: true
    }
);

export default model("Order", orderSchema);