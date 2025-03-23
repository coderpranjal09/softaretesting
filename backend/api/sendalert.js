import twilio from 'twilio';
import vehicleData from '../../../data/vehicleData.json';

export default async (req, res) => {
    try {
        const { vehicleID, message } = req.body;
        
        // Validate input
        if (!vehicleID || !message) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Find vehicle
        const vehicle = vehicleData.find(v => 
            v.vehicleID.toUpperCase() === vehicleID.toUpperCase()
        );
        
        if (!vehicle) {
            return res.status(404).json({ error: 'Vehicle not found' });
        }

        // Initialize Twilio
        const client = twilio(
            process.env.TWILIO_ACCOUNT_SID,
            process.env.TWILIO_AUTH_TOKEN
        );

        // Send SMS
        const result = await client.messages.create({
            body: message,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: vehicle.driverMobile
        });

        res.json({
            success: true,
            message: `Alert sent to ${vehicle.driverMobile}`,
            sid: result.sid
        });

    } catch (error) {
        res.status(500).json({
            error: error.message,
            details: error.stack
        });
    }
};