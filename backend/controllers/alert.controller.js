const twilio = require('twilio');
const twilioConfig = require('../config/twilio.config');
const vehicleData = require('../data/vehicleData.json');

const client = twilio(twilioConfig.accountSid, twilioConfig.authToken);

const sendAlert = async (req, res) => {
    try {
        const { vehicleID, message } = req.body;
        const vehicle = vehicleData.find(v => v.vehicleID.toUpperCase() === vehicleID.toUpperCase());

        if (!vehicle) {
            return res.status(404).json({ error: 'Vehicle not found' });
        }

        // Send SMS using Twilio
        const response = await client.messages.create({
            body: message,
            from: twilioConfig.phoneNumber,
            to: vehicle.driverMobile
        });

        res.json({
            success: true,
            message: `Alert sent to ${vehicle.driverName}`,
            sid: response.sid
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { sendAlert };