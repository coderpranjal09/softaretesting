// db.js
const vehicleData = require('./data/vehicleData.json');

const getDriverNumber = (vehicleID) => {
  const vehicle = vehicleData.find(v => 
    v.vehicleID.toUpperCase() === vehicleID.toUpperCase()
  );
  
  if (!vehicle) throw new Error('Vehicle not found');
  if (!vehicle.driverMobile) throw new Error('Driver number not available');
  
  return vehicle.driverMobile;
};

module.exports = { getDriverNumber };