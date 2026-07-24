require("dotenv").config();

const mongoose = require("mongoose");
const User = require("../models/User");

async function makeAdmin() {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        const email = "humblemorde@gmail.com";

        const user = await User.findOne({ email });

        if (!user) {
            console.log("User not found");
            process.exit();
        }

        user.role = "admin";

        await user.save();

        console.log("✅ Admin created");

        process.exit();

    } catch (error) {
        console.log(error.message);
        process.exit();
    }
}

makeAdmin();
