require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/database");

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", require("./routes/auth"));


// Test Route
app.get("/", (req, res) => {
    res.json({
        app: "SwiftSurvey API",
        status: "Running ✅"
    });
});


// Payment Routes (we will create next)
app.use("/api/payments", require("./routes/payments"));


// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
