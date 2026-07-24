require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const paymentRoutes = require("./routes/payments");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.log(err));

app.get("/", (req, res) => {
    res.json({
        app: "SwiftSurvey Backend",
        status: "Running"
    });
});

app.use("/api/payments", paymentRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
