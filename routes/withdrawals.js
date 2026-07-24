// routes/withdrawals.js

const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const {
    requestWithdrawal
} = require("../controllers/withdrawalController");


// Request withdrawal
router.post(
    "/request",
    auth,
    requestWithdrawal
);


module.exports = router;
