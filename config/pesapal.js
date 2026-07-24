// config/pesapal.js

const axios = require("axios");

const PESAPAL_URL = "https://pay.pesapal.com/v3";


async function getPesapalToken() {
    try {

        const response = await axios.post(
            `${PESAPAL_URL}/api/Auth/RequestToken`,
            {
                consumer_key: process.env.PESAPAL_CONSUMER_KEY,
                consumer_secret: process.env.PESAPAL_CONSUMER_SECRET
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            }
        );


        return response.data.token;


    } catch (error) {

        console.error(
            "Pesapal Authentication Error:",
            error.response?.data || error.message
        );

        throw new Error("Pesapal token generation failed");
    }
}


module.exports = {
    getPesapalToken,
    PESAPAL_URL
};
