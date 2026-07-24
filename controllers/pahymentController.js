// Pesapal IPN Handler
exports.paymentIPN = async (req, res) => {

    try {

        const {
            OrderTrackingId
        } = req.query;


        if (!OrderTrackingId) {
            return res.status(400).json({
                message: "Missing OrderTrackingId"
            });
        }


        const token = await getPesapalToken();


        // Check payment status from Pesapal
        const response = await axios.get(
            `${PESAPAL_URL}/api/Transactions/GetTransactionStatus?orderTrackingId=${OrderTrackingId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json"
                }
            }
        );


        const paymentData = response.data;


        // Find transaction
        const transaction = await Transaction.findOne({
            orderTrackingId: OrderTrackingId
        });


        if (transaction) {

            transaction.status =
                paymentData.payment_status_description || "PENDING";

            transaction.paymentMethod =
                paymentData.payment_method;

            transaction.confirmationCode =
                paymentData.confirmation_code;

            await transaction.save();

        }


        // Pesapal expected response
        res.json({
            orderNotificationType: "IPNCHANGE",
            orderTrackingId: OrderTrackingId,
            status: 200
        });


    } catch (error) {

        console.log(
            "IPN Error:",
            error.response?.data || error.message
        );


        res.status(500).json({
            message: "IPN processing failed"
        });

    }

};
