// Vehicle routes implementation
const express = require('express');
const router = express.Router();
const Vehicle = require('../models/Vehicle');

// Get nearby vehicles
router.get('/nearby', async (req, res) => {
  try {
    const { latitude, longitude, radius = 5 } = req.query;
    
    // Convert latitude and longitude to numbers
    const lat = parseFloat(latitude);
    const lng = parseFloat(longitude);
    const rad = parseFloat(radius);
    
    if (isNaN(lat) || isNaN(lng) || isNaN(rad)) {
      return res.status(400).json({ success: false, message: 'Invalid coordinates' });
    }
    
    // Find available vehicles within radius (simplified - in production use geospatial queries)
    const vehicles = await Vehicle.find({
      status: 'available',
      // Simplified distance calculation for demo
      // In production: use proper geospatial queries with $near
      latitude: { $gte: lat - rad * 0.01, $lte: lat + rad * 0.01 },
      longitude: { $gte: lng - rad * 0.01, $lte: lng + rad * 0.01 }
    });
    
    res.json({ 
      success: true,
      vehicles: vehicles.map(vehicle => ({
        _id: vehicle._id,
        vehicleNumber: vehicle.vehicleNumber,
        type: vehicle.type,
        status: vehicle.status,
        latitude: vehicle.latitude,
        longitude: vehicle.longitude,
        driverName: vehicle.driverName
      }))
    });
  } catch (error) {
    console.error('Nearby vehicles error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Get vehicle details
router.get('/:vehicleId', async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.vehicleId);
    
    if (!vehicle) {
      return res.status(404).json({ success: false, message: 'Vehicle not found' });
    }
    
    res.json({ 
      success: true,
      vehicle: {
        _id: vehicle._id,
        vehicleNumber: vehicle.vehicleNumber,
        type: vehicle.type,
        status: vehicle.status,
        latitude: vehicle.latitude,
        longitude: vehicle.longitude,
        driverName: vehicle.driverName,
        driverPhone: vehicle.driverPhone
      }
    });
  } catch (error) {
    console.error('Vehicle details error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Update vehicle location (for live tracking)
router.put('/:vehicleId/location', async (req, res) => {
  try {
    const { latitude, longitude } = req.body;
    
    const vehicle = await Vehicle.findByIdAndUpdate(
      req.params.vehicleId,
      { latitude, longitude, lastUpdated: new Date() },
      { new: true }
    );
    
    if (!vehicle) {
      return res.status(404).json({ success: false, message: 'Vehicle not found' });
    }
    
    res.json({ success: true, message: 'Vehicle location updated successfully' });
  } catch (error) {
    console.error('Update vehicle location error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

module.exports = router;