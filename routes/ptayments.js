const express = require("express");
const router = express.Router();

const {
    createPayment,
    checkStatus,
    paymentCallback,
    paymentIPN
} = require("../controllers/paymentController");


router.post("/create", createPayment);

router.get("/status/:id", checkStatus);


// Pesapal redirects user here
router.get("/callback", paymentCallback);


// Pesapal sends notifications here
router.post("/ipn", paymentIPN);


module.exports = router;
