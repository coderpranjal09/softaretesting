import vehicleData from '../../data/vehicleData.json';

export default async (req, res) => {
    const { id } = req.query;
    
    try {
        const vehicle = vehicleData.find(v => 
            v.vehicleID.toUpperCase() === id.toUpperCase()
        );

        if (!vehicle) {
            return res.status(404).json({ error: 'Vehicle not found' });
        }

        res.json(vehicle);
    } catch (error) {
        res.status(500).json({ 
            error: 'Server error',
            details: error.message
        });
    }
};