// controllers/adminDashboardController.js

const User = require("../models/User");
const Transaction = require("../models/Transaction");


// Admin Statistics
exports.getStats = async (req, res) => {

    try {

        const totalUsers = await User.countDocuments();

        const totalTransactions =
            await Transaction.countDocuments();


        const pendingWithdrawals =
            await Transaction.countDocuments({
                type: "withdrawal",
                status: "PENDING"
            });


        const completedPayments =
            await Transaction.countDocuments({
                type: "deposit",
                status: "COMPLETED"
            });


        res.json({

            totalUsers,

            totalTransactions,

            pendingWithdrawals,

            completedPayments

        });


    } catch(error){

        res.status(500).json({
            message: error.message
        });

    }

};
