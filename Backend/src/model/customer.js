import { Schema, model } from "mongoose";

const customerSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },

    lastName: {
        type: String,
        required: true,
        trim: true
    },

    phone: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },

    password: {
        type: String,
        required: true
    },

    status: {
        type: String,
        enum: ["Active", "Inactive"],
        default: "Active"
    },

    isVerified: {
        type: Boolean,
        default: false
    },

    loginAttempts: {
        type: Number,
        default: 0
    },

    lockUntil: {
        type: Date,
        default: null
    }
}, {
    timestamps: true,
    strict: true
}
);

export default model("Customer", customerSchema);