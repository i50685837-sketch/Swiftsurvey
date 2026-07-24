// routes/payments.js

const express = require("express");
const router = express.Router();

const {
    createPayment,
    checkStatus
} = require("../controllers/paymentController");


// Create payment order
router.post(
    "/create",
    createPayment
);


// Check payment status
router.get(
    "/status/:id",
    checkStatus
);


module.exports = router;
