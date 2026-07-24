// middleware/auth.js

const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {

    try {

        const token = req.headers.authorization;


        if(!token){

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

        return res.status(401).json({
            message: "Invalid or expired token"
        });

    }

};


module.exports = auth;
