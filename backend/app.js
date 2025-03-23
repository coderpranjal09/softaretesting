const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

// Middleware
app.use(cors({ origin: '*' }));
app.use(express.json());

// API Route
app.post('/api/send-alert', (req, res) => {
    const { vehicleID, message } = req.body;

    if (!vehicleID || !message) {
        return res.status(400).json({ error: 'Vehicle ID and message are required' });
    }

    console.log(`🚨 Alert for vehicle ${vehicleID}: ${message}`);
    res.status(200).json({ success: true, message: 'Alert sent successfully' });
});

// Server setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
