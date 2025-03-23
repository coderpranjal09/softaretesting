// api/send-alert.js
const twilio = require('twilio');
const { getDriverNumber } = require('../db');
const path = require('path');
require('dotenv').config();

export default async (req, res) => {
  try {
    const { vehicleID, message } = req.body;
    
    // Validate input
    if (!vehicleID || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Get driver number from database
    const toNumber = await getDriverNumber(vehicleID);
    
    // Initialize Twilio client
    const client = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );

    // Send SMS
    const result = await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: toNumber
    });

    res.status(200).json({
      success: true,
      message: `Alert sent to ${toNumber}`,
      sid: result.sid
    });

  } catch (error) {
    res.status(500).json({
      error: error.message,
      details: error.stack
    });
  }
};