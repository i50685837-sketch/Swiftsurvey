// controllers/profileController.js

const User = require("../models/User");
const Wallet = require("../models/Wallet");
const Transaction = require("../models/Transaction");


exports.getProfile = async (req, res) => {

    try {

        const user = await User.findById(req.user.id)
            .select("-password");


        const wallet = await Wallet.findOne({
            user: req.user.id
        });


        const transactions = await Transaction.find({
            user: req.user.id
        })
        .sort({
            createdAt: -1
        })
        .limit(10);


        res.json({

            user,

            wallet: {
                balance: wallet?.balance || 0,
                currency: wallet?.currency || "KES"
            },

            transactions

        });


    } catch(error){

        res.status(500).json({
            message: error.message
        });

    }

};
