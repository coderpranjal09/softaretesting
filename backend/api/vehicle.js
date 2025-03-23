const vehicleData = require('../data/vehicleData.json');

export default async (req, res) => {
  const { id } = req.query;
  
  const vehicle = vehicleData.find(v => 
    v.vehicleID.toUpperCase() === id.toUpperCase()
  );

  if (!vehicle) {
    return res.status(404).json({ error: 'Vehicle not found' });
  }

  res.json(vehicle);
};