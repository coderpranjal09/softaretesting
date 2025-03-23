const twilio = require('twilio');

export default async (req, res) => {
  const { vehicleID, message } = req.body;

  // Initialize Twilio
  const client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
  );

  try {
    // Your alert sending logic here
    await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER});

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};