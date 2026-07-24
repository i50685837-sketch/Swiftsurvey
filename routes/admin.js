// routes/admin.js

const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const {
    getWithdrawals,
    approveWithdrawal,
    rejectWithdrawal
} = require("../controllers/adminController");


// View pending withdrawals
router.get(
    "/withdrawals",
    auth,
    getWithdrawals
);


// Approve withdrawal
router.put(
    "/withdrawals/approve/:id",
    auth,
    approveWithdrawal
);


// Reject withdrawal
router.put(
    "/withdrawals/reject/:id",
    auth,
    rejectWithdrawal
);


module.exports = router;
