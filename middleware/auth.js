// middleware/auth.js

const jwt = require("jsonwebtoken");
const User = require("../models/User");


const auth = async (req, res, next) => {

    try {

        const token = req.headers.authorization;


        if (!token) {
            return res.status(401).json({
                message: "No token provided"
            });
        }


        const accessToken = token.split(" ")[1];


        const decoded = jwt.verify(
            accessToken,
            process.env.JWT_SECRET
        );


        req.user = decoded;


        next();


    } catch(error){

        res.status(401).json({
            message:"Invalid token"
        });

    }

};



// Admin check
const adminOnly = async (req, res, next) => {

    try {

        const user = await User.findById(
            req.user.id
        );


        if (!user || user.role !== "admin") {

            return res.status(403).json({
                message:"Admin access only"
            });

        }


        next();


    } catch(error){

        res.status(500).json({
            message:error.message
        });

    }

};


module.exports = {
    auth,
    adminOnly
};
