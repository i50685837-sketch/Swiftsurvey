require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();


// Middleware

app.use(cors());

app.use(express.json());




// Database Connection

mongoose.connect(process.env.MONGO_URI)

.then(()=>{

    console.log("MongoDB Connected");

})

.catch((error)=>{

    console.log("MongoDB Error:", error);

});




// Routes

app.use(
    "/api/auth",
    require("./routes/auth")
);


// Profile route

app.use(
    "/api",
    require("./routes/profile")
);



// Test route

app.get("/", (req,res)=>{

    res.send("SwiftSurvey API Running");

});




// Server

const PORT = process.env.PORT || 5000;


app.listen(PORT,()=>{

    console.log(
        `Server running on port ${PORT}`
    );

});
