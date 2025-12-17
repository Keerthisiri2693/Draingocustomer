// Owner routes
const express = require('express');
const router = express.Router();
const Owner = require('../models/Owner');
const Vehicle = require('../models/Vehicle');
const Driver = require('../models/Driver');
const { detectOwner, isOwnerByPhone, validateRate, needsRateRenewalReminder } = require('../utils/ownerUtils');

// Owner registration
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, businessName, phoneNumber } = req.body;
    
    // Check if owner already exists
    const existingOwner = await Owner.findOne({ $or: [{ email }, { phoneNumber }] });
    if (existingOwner) {
      return res.status(400).json({ message: 'Owner already exists with this email or phone number' });
    }
    
    // Create new owner
    const owner = new Owner({
      name,
      email,
      password, // In production, this should be hashed
      businessName,
      phoneNumber,
      isVerified: true // Auto-verify for demo purposes
    });
    
    await owner.save();
    res.status(201).json({ message: 'Owner registered successfully', owner });
  } catch (error) {
    console.error('Owner registration error:', error);
    res.status(500).json({ message: 'Server error during owner registration' });
  }
});

// Owner login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find owner by email
    const owner = await Owner.findOne({ email });
    if (!owner) {
      return res.status(404).json({ message: 'Owner not found' });
    }
    
    // Check password (in production, use proper password comparison)
    if (owner.password !== password) {
      return res.status(401).json({ message: 'Invalid password' });
    }
    
    res.json({ message: 'Login successful', owner });
  } catch (error) {
    console.error('Owner login error:', error);
    res.status(500).json({ message: 'Server error during owner login' });
  }
});

// Get owner profile
router.get('/:ownerId', async (req, res) => {
  try {
    const owner = await Owner.findById(req.params.ownerId);
    if (!owner) {
      return res.status(404).json({ message: 'Owner not found' });
    }
    
    res.json(owner);
  } catch (error) {
    console.error('Get owner error:', error);
    res.status(500).json({ message: 'Server error getting owner' });
  }
});

// Add new vehicle
router.post('/:ownerId/vehicles', async (req, res) => {
  try {
    const { vehicleNumber, type, model, tankCapacity, rate, area } = req.body;
    
    // Validate vehicle type
    if (!['tractor', 'truck'].includes(type)) {
      return res.status(400).json({ message: 'Invalid vehicle type. Must be tractor or truck' });
    }
    
    // Validate tank capacity based on vehicle type
    if (type === 'tractor' && tankCapacity >= 5000) {
      return res.status(400).json({ message: 'Tractor tank capacity must be less than 5000L' });
    }
    if (type === 'truck' && tankCapacity >= 15000) {
      return res.status(400).json({ message: 'Truck tank capacity must be less than 15000L' });
    }
    
    // Set rate expiration to 6 months from now
    const rateExpiration = new Date();
    rateExpiration.setMonth(rateExpiration.getMonth() + 6);
    
    // Create new vehicle
    const vehicle = new Vehicle({
      vehicleNumber,
      type,
      model,
      tankCapacity,
      rate,
      rateExpiration,
      area,
      ownerId: req.params.ownerId,
      status: 'available'
    });
    
    await vehicle.save();
    res.status(201).json({ message: 'Vehicle added successfully', vehicle });
  } catch (error) {
    console.error('Add vehicle error:', error);
    res.status(500).json({ message: 'Server error adding vehicle' });
  }
});

// Get all vehicles for owner
router.get('/:ownerId/vehicles', async (req, res) => {
  try {
    const vehicles = await Vehicle.find({ ownerId: req.params.ownerId }).populate('driverId');
    
    // Check rate validation for each vehicle
    const vehiclesWithStatus = vehicles.map(vehicle => {
      const isRateValid = validateRate(vehicle.rateExpiration);
      const needsRenewal = needsRateRenewalReminder(vehicle.rateExpiration);
      
      return {
        ...vehicle._doc,
        isRateValid,
        needsRenewal
      };
    });
    
    res.json(vehiclesWithStatus);
  } catch (error) {
    console.error('Get vehicles error:', error);
    res.status(500).json({ message: 'Server error getting vehicles' });
  }
});

// Get single vehicle details
router.get('/:ownerId/vehicles/:vehicleId', async (req, res) => {
  try {
    const vehicle = await Vehicle.findOne({
      _id: req.params.vehicleId,
      ownerId: req.params.ownerId
    }).populate('driverId');
    
    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }
    
    const isRateValid = validateRate(vehicle.rateExpiration);
    const needsRenewal = needsRateRenewalReminder(vehicle.rateExpiration);
    
    res.json({ ...vehicle._doc, isRateValid, needsRenewal });
  } catch (error) {
    console.error('Get vehicle details error:', error);
    res.status(500).json({ message: 'Server error getting vehicle details' });
  }
});

// Update vehicle
router.put('/:ownerId/vehicles/:vehicleId', async (req, res) => {
  try {
    const { vehicleNumber, type, model, tankCapacity, rate, area, status } = req.body;
    
    // Validate vehicle type
    if (type && !['tractor', 'truck'].includes(type)) {
      return res.status(400).json({ message: 'Invalid vehicle type. Must be tractor or truck' });
    }
    
    // Validate tank capacity based on vehicle type
    if (type === 'tractor' && tankCapacity && tankCapacity >= 5000) {
      return res.status(400).json({ message: 'Tractor tank capacity must be less than 5000L' });
    }
    if (type === 'truck' && tankCapacity && tankCapacity >= 15000) {
      return res.status(400).json({ message: 'Truck tank capacity must be less than 15000L' });
    }
    
    // Update vehicle
    const vehicle = await Vehicle.findOneAndUpdate(
      { _id: req.params.vehicleId, ownerId: req.params.ownerId },
      {
        vehicleNumber,
        type,
        model,
        tankCapacity,
        rate,
        area,
        status,
        updatedAt: Date.now()
      },
      { new: true }
    );
    
    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }
    
    res.json({ message: 'Vehicle updated successfully', vehicle });
  } catch (error) {
    console.error('Update vehicle error:', error);
    res.status(500).json({ message: 'Server error updating vehicle' });
  }
});

// Add driver
router.post('/:ownerId/drivers', async (req, res) => {
  try {
    const { name, phoneNumber, licenseNumber, address } = req.body;
    
    // Check if driver already exists
    const existingDriver = await Driver.findOne({ $or: [{ phoneNumber }, { licenseNumber }] });
    if (existingDriver) {
      return res.status(400).json({ message: 'Driver already exists with this phone number or license' });
    }
    
    // Create new driver
    const driver = new Driver({
      name,
      phoneNumber,
      licenseNumber,
      address,
      ownerId: req.params.ownerId,
      status: 'active'
    });
    
    await driver.save();
    res.status(201).json({ message: 'Driver added successfully', driver });
  } catch (error) {
    console.error('Add driver error:', error);
    res.status(500).json({ message: 'Server error adding driver' });
  }
});

// Get all drivers for owner
router.get('/:ownerId/drivers', async (req, res) => {
  try {
    const drivers = await Driver.find({ ownerId: req.params.ownerId });
    res.json(drivers);
  } catch (error) {
    console.error('Get drivers error:', error);
    res.status(500).json({ message: 'Server error getting drivers' });
  }
});

// Update driver
router.put('/:ownerId/drivers/:driverId', async (req, res) => {
  try {
    const { name, phoneNumber, licenseNumber, address, status } = req.body;
    
    // Update driver
    const driver = await Driver.findOneAndUpdate(
      { _id: req.params.driverId, ownerId: req.params.ownerId },
      {
        name,
        phoneNumber,
        licenseNumber,
        address,
        status,
        updatedAt: Date.now()
      },
      { new: true }
    );
    
    if (!driver) {
      return res.status(404).json({ message: 'Driver not found' });
    }
    
    res.json({ message: 'Driver updated successfully', driver });
  } catch (error) {
    console.error('Update driver error:', error);
    res.status(500).json({ message: 'Server error updating driver' });
  }
});

// Owner detection endpoint
router.post('/detect-owner', async (req, res) => {
  try {
    const { phoneNumber } = req.body;
    
    if (!phoneNumber) {
      return res.status(400).json({ message: 'Phone number is required' });
    }
    
    const isOwner = await detectOwner(phoneNumber);
    res.json({ isOwner });
  } catch (error) {
    console.error('Owner detection error:', error);
    res.status(500).json({ message: 'Server error during owner detection' });
  }
});

module.exports = router;