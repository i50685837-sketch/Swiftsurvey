// server.js

require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/database");

const app = express();


// Database
connectDB();


// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Test API
app.get("/", (req, res) => {
    res.json({
        app: "SwiftSurvey API",
        status: "Running ✅"
    });
});


// Routes
app.use("/api/auth", require("./routes/auth"));

app.use("/api/payments", require("./routes/payments"));

app.use("/api/wallet", require("./routes/wallet"));


// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
