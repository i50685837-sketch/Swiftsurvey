// utils/makeAdmin.js

require("dotenv").config();

const mongoose = require("mongoose");
const User = require("../models/User");


const makeAdmin = async () => {

    try {

        await mongoose.connect(
            process.env.MONGO_URI
        );


        const email = "your-email@example.com";


        const user = await User.findOne({
            email
        });


        if(!user){

            console.log("User not found");
            process.exit();

        }


        user.role = "admin";

        await user.save();


        console.log("✅ User is now admin");


        process.exit();


    } catch(error){

        console.log(error.message);
        process.exit();

    }

};


makeAdmin();
