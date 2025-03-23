const vehicleData = require('../data/vehicleData.json');

const getVehicleDetails = async (req, res) => {
    try {
        const vehicle = vehicleData.find(v => v.vehicleID.toUpperCase() === req.params.id.toUpperCase());
        
        if (!vehicle) {
            return res.status(404).json({ error: 'Vehicle not found' });
        }
        
        res.json(vehicle);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = { getVehicleDetails };