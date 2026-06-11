import { Schema, model } from "mongoose";

const clientSchema = new Schema({
    image: {
        type: String,
        default: null
    },
    publicId: {
        type: String,
        default: null
    },
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
    }
}, {
    timestamps: true,
    strict: true
});

export default model("Client", clientSchema);