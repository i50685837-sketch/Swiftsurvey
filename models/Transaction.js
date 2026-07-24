// models/Transaction.js

const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
{
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    merchantReference: {
        type: String,
        required: true
    },

    orderTrackingId: {
        type: String
    },

    amount: {
        type: Number,
        required: true
    },

    currency: {
        type: String,
        default: "KES"
    },

    type: {
        type: String,
        enum: ["deposit", "withdrawal"],
        default: "deposit"
    },

    status: {
        type: String,
        enum: [
            "PENDING",
            "COMPLETED",
            "FAILED",
            "CANCELLED"
        ],
        default: "PENDING"
    },

    paymentMethod: {
        type: String
    },

    confirmationCode: {
        type: String
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
}
);

module.exports = mongoose.model("Transaction", transactionSchema);
