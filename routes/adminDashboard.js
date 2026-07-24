// routes/adminDashboard.js

const express = require("express");
const router = express.Router();

const { auth, adminOnly } = require("../middleware/auth");

const {
    getStats
} = require("../controllers/adminDashboardController");


// Admin dashboard statistics
router.get(
    "/stats",
    auth,
    adminOnly,
    getStats
);


module.exports = router;
