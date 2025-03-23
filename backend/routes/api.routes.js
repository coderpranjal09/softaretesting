const express = require('express');
const router = express.Router();
const { getVehicleDetails } = require('../controllers/vehicle.controller');
const { sendAlert } = require('../controllers/alert.controller');

router.get('/vehicle/:id', getVehicleDetails);
router.post('/send-alert', sendAlert);

module.exports = router;