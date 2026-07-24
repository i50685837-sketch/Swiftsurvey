// controllers/adminController.js

const Transaction = require("../models/Transaction");


// View pending withdrawals
exports.getWithdrawals = async (req, res) => {

    try {

        const withdrawals = await Transaction.find({
            type: "withdrawal",
            status: "PENDING"
        })
        .sort({
            createdAt: -1
        });


        res.json(withdrawals);


    } catch(error){

        res.status(500).json({
            message: error.message
        });

    }

};



// Approve withdrawal
exports.approveWithdrawal = async (req,res)=>{

    try{

        const withdrawal =
        await Transaction.findById(req.params.id);


        if(!withdrawal){

            return res.status(404).json({
                message:"Withdrawal not found"
            });

        }


        withdrawal.status = "COMPLETED";

        await withdrawal.save();


        res.json({
            success:true,
            message:"Withdrawal approved"
        });


    }catch(error){

        res.status(500).json({
            message:error.message
        });

    }

};



// Reject withdrawal
exports.rejectWithdrawal = async (req,res)=>{

    try{

        const withdrawal =
        await Transaction.findById(req.params.id);


        withdrawal.status = "FAILED";


        await withdrawal.save();


        res.json({
            success:true,
            message:"Withdrawal rejected"
        });


    }catch(error){

        res.status(500).json({
            message:error.message
        });

    }

};
