// Admin routes
const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');
const Owner = require('../models/Owner');
const Driver = require('../models/Driver');
const Vehicle = require('../models/Vehicle');
const Feedback = require('../models/Feedback');
const Booking = require('../models/Booking');

// Admin login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find admin by username
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    // Check password (in production, use proper password comparison)
    if (admin.password !== password) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    res.json({ 
      message: 'Admin login successful', 
      admin: { 
        id: admin._id, 
        username: admin.username, 
        email: admin.email, 
        role: admin.role 
      } 
    });
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({ message: 'Server error during admin login' });
  }
});

// Get all pending owners for approval
router.get('/pending-owners', async (req, res) => {
  try {
    const pendingOwners = await Owner.find({ isVerified: false });
    res.json(pendingOwners);
  } catch (error) {
    console.error('Get pending owners error:', error);
    res.status(500).json({ message: 'Server error getting pending owners' });
  }
});

// Approve owner
router.put('/approve-owner/:ownerId', async (req, res) => {
  try {
    const owner = await Owner.findByIdAndUpdate(
      req.params.ownerId,
      { isVerified: true },
      { new: true }
    );

    if (!owner) {
      return res.status(404).json({ message: 'Owner not found' });
    }

    res.json({ message: 'Owner approved successfully', owner });
  } catch (error) {
    console.error('Approve owner error:', error);
    res.status(500).json({ message: 'Server error approving owner' });
  }
});

// Reject owner
router.put('/reject-owner/:ownerId', async (req, res) => {
  try {
    const owner = await Owner.findByIdAndUpdate(
      req.params.ownerId,
      { isVerified: false, rejectionReason: req.body.reason },
      { new: true }
    );

    if (!owner) {
      return res.status(404).json({ message: 'Owner not found' });
    }

    res.json({ message: 'Owner rejected successfully', owner });
  } catch (error) {
    console.error('Reject owner error:', error);
    res.status(500).json({ message: 'Server error rejecting owner' });
  }
});

// Get all pending drivers for approval
router.get('/pending-drivers', async (req, res) => {
  try {
    const pendingDrivers = await Driver.find({ status: 'pending' });
    res.json(pendingDrivers);
  } catch (error) {
    console.error('Get pending drivers error:', error);
    res.status(500).json({ message: 'Server error getting pending drivers' });
  }
});

// Approve driver
router.put('/approve-driver/:driverId', async (req, res) => {
  try {
    const driver = await Driver.findByIdAndUpdate(
      req.params.driverId,
      { status: 'active' },
      { new: true }
    );

    if (!driver) {
      return res.status(404).json({ message: 'Driver not found' });
    }

    res.json({ message: 'Driver approved successfully', driver });
  } catch (error) {
    console.error('Approve driver error:', error);
    res.status(500).json({ message: 'Server error approving driver' });
  }
});

// Reject driver
router.put('/reject-driver/:driverId', async (req, res) => {
  try {
    const driver = await Driver.findByIdAndUpdate(
      req.params.driverId,
      { status: 'rejected', rejectionReason: req.body.reason },
      { new: true }
    );

    if (!driver) {
      return res.status(404).json({ message: 'Driver not found' });
    }

    res.json({ message: 'Driver rejected successfully', driver });
  } catch (error) {
    console.error('Reject driver error:', error);
    res.status(500).json({ message: 'Server error rejecting driver' });
  }
});

// Get all feedback
router.get('/feedback', async (req, res) => {
  try {
    const feedbacks = await Feedback.find()
      .populate('customer', 'name email')
      .populate('vehicle', 'vehicleNumber type')
      .populate('booking', 'bookingDate status')
      .sort({ createdAt: -1 });

    res.json(feedbacks);
  } catch (error) {
    console.error('Get feedback error:', error);
    res.status(500).json({ message: 'Server error getting feedback' });
  }
});

// Get area-wise rates
router.get('/area-rates', async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    
    // Group by area and calculate average rates
    const areaRates = {};
    vehicles.forEach(vehicle => {
      if (!areaRates[vehicle.area]) {
        areaRates[vehicle.area] = { total: 0, count: 0 };
      }
      areaRates[vehicle.area].total += vehicle.rate;
      areaRates[vehicle.area].count += 1;
    });

    // Calculate averages
    const result = Object.keys(areaRates).map(area => ({
      area,
      averageRate: areaRates[area].total / areaRates[area].count,
      vehicleCount: areaRates[area].count
    }));

    res.json(result);
  } catch (error) {
    console.error('Get area rates error:', error);
    res.status(500).json({ message: 'Server error getting area rates' });
  }
});

// Update area-wise rates
router.put('/area-rates/:area', async (req, res) => {
  try {
    const { rate } = req.body;
    
    // Update all vehicles in this area with the new rate
    const result = await Vehicle.updateMany(
      { area: req.params.area },
      { rate: rate }
    );

    res.json({ 
      message: 'Area rates updated successfully',
      updatedCount: result.nModified
    });
  } catch (error) {
    console.error('Update area rates error:', error);
    res.status(500).json({ message: 'Server error updating area rates' });
  }
});

// Get dashboard statistics
router.get('/stats', async (req, res) => {
  try {
    const ownerCount = await Owner.countDocuments();
    const driverCount = await Driver.countDocuments();
    const vehicleCount = await Vehicle.countDocuments();
    const bookingCount = await Booking.countDocuments();
    const feedbackCount = await Feedback.countDocuments();
    
    // Get recent bookings
    const recentBookings = await Booking.find()
      .sort({ bookingDate: -1 })
      .limit(5)
      .populate('customer', 'name')
      .populate('vehicle', 'vehicleNumber');

    res.json({
      ownerCount,
      driverCount,
      vehicleCount,
      bookingCount,
      feedbackCount,
      recentBookings
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ message: 'Server error getting stats' });
  }
});

module.exports = router;