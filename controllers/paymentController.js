// controllers/paymentController.js

const { getPesapalToken, PESAPAL_URL } = require("../config/pesapal");
const Transaction = require("../models/Transaction");
const { v4: uuidv4 } = require("uuid");
const axios = require("axios");


// Create Pesapal Payment Order
exports.createPayment = async (req, res) => {

    try {

        const token = await getPesapalToken();

        const reference = "SWIFT-" + uuidv4();


        const order = {
            id: reference,
            currency: "KES",
            amount: req.body.amount,
            description: "SwiftSurvey Payment",
            callback_url: process.env.PESAPAL_CALLBACK_URL,

            billing_address: {
                email_address: req.body.email,
                phone_number: req.body.phone,
                first_name: req.body.name
            }
        };


        const response = await axios.post(
            `${PESAPAL_URL}/api/Transactions/SubmitOrderRequest`,
            order,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                    "Content-Type": "application/json"
                }
            }
        );


        const payment = await Transaction.create({
            user: req.user?.id,
            merchantReference: reference,
            orderTrackingId: response.data.order_tracking_id,
            amount: req.body.amount
        });


        res.json({
            success: true,
            payment,
            redirect_url: response.data.redirect_url
        });


    } catch(error){

        console.log(error.response?.data || error.message);

        res.status(500).json({
            success:false,
            message:"Payment creation failed"
        });
    }

};



// Check Transaction Status
exports.checkStatus = async (req,res)=>{

    try{

        const token = await getPesapalToken();

        const response = await axios.get(
            `${PESAPAL_URL}/api/Transactions/GetTransactionStatus?orderTrackingId=${req.params.id}`,
            {
                headers:{
                    Authorization:`Bearer ${token}`,
                    Accept:"application/json"
                }
            }
        );


        res.json(response.data);


    }catch(error){

        res.status(500).json({
            message:"Status check failed"
        });
    }

};
