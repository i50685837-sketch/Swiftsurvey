// routes/wallet.js

const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const {
    getWallet,
    getTransactions
} = require("../controllers/walletController");


// Get wallet balance
router.get(
    "/",
    auth,
    getWallet
);


// Get transaction history
router.get(
    "/transactions",
    auth,
    getTransactions
);


module.exports = router;
