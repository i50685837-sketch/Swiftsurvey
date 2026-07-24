// controllers/withdrawalController.js

const Wallet = require("../models/Wallet");
const Transaction = require("../models/Transaction");
const { v4: uuidv4 } = require("uuid");


// Request Withdrawal
exports.requestWithdrawal = async (req, res) => {

    try {

        const { amount, phone } = req.body;


        const wallet = await Wallet.findOne({
            user: req.user.id
        });


        if (!wallet) {
            return res.status(404).json({
                message: "Wallet not found"
            });
        }


        if (wallet.balance < amount) {
            return res.status(400).json({
                message: "Insufficient balance"
            });
        }


        wallet.balance -= amount;
        await wallet.save();


        const transaction = await Transaction.create({

            user: req.user.id,

            merchantReference:
                "WITHDRAW-" + uuidv4(),

            amount,

            type: "withdrawal",

            status: "PENDING"

        });


        res.json({

            success: true,

            message:
            "Withdrawal request submitted",

            transaction

        });


    } catch(error){

        res.status(500).json({
            message:error.message
        });

    }

};
