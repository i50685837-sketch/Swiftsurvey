// controllers/walletController.js

const Wallet = require("../models/Wallet");
const Transaction = require("../models/Transaction");


// Get Wallet Balance
exports.getWallet = async (req, res) => {

    try {

        const wallet = await Wallet.findOne({
            user: req.user.id
        });


        if (!wallet) {
            return res.status(404).json({
                message: "Wallet not found"
            });
        }


        res.json({
            balance: wallet.balance,
            currency: wallet.currency
        });


    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};



// Get Transaction History
exports.getTransactions = async (req, res) => {

    try {

        const transactions = await Transaction.find({
            user: req.user.id
        })
        .sort({
            createdAt: -1
        });


        res.json(transactions);


    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};
