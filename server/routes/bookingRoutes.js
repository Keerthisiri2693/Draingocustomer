// Booking routes implementation
import express from 'express';
const router = express.Router();
import Booking from '../models/Booking.js';
import Vehicle from '../models/Vehicle.js';
import Customer from '../models/Customer.js';
import { generateOTP } from '../utils/otpUtils.js';

// Create new booking
router.post('/create', async (req, res) => {
  try {
    const { customerId, pickupLocation, vehicleType } = req.body;
    
    // Find available vehicle
    const availableVehicle = await Vehicle.findOne({
      type: vehicleType,
      status: 'available'
    });
    
    if (!availableVehicle) {
      return res.status(400).json({ success: false, message: 'No available vehicles' });
    }
    
    // Calculate estimated time and amount (simplified)
    const estimatedTime = Math.floor(Math.random() * 30) + 10; // 10-40 minutes
    const amount = Math.floor(Math.random() * 1000) + 500; // ₹500-1500
    
    // Create booking
    const booking = new Booking({
      customer: customerId,
      vehicle: availableVehicle._id,
      pickupLocation,
      status: 'pending',
      estimatedTime,
      amount,
      vehicleNumber: availableVehicle.vehicleNumber
    });
    
    await booking.save();
    
    // Update vehicle status
    availableVehicle.status = 'booked';
    await availableVehicle.save();
    
    res.status(201).json({ 
      success: true, 
      message: 'Booking created successfully',
      booking: {
        _id: booking._id,
        vehicleId: availableVehicle._id,
        vehicleNumber: availableVehicle.vehicleNumber,
        estimatedTime,
        amount,
        status: booking.status
      }
    });
  } catch (error) {
    console.error('Booking creation error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Generate OTP for booking confirmation
router.post('/generate-otp', async (req, res) => {
  try {
    const { bookingId } = req.body;
    
    const booking = await Booking.findById(bookingId);
    
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }
    
    // Generate OTP
    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
    
    // Update booking with OTP
    booking.otp = otp;
    booking.otpExpires = otpExpires;
    await booking.save();
    
    // In production, send SMS with OTP
    // const customer = await Customer.findById(booking.customer);
    // await sendSMS(customer.phoneNumber, `Your booking OTP is: ${otp}`);
    
    res.json({ success: true, otp }); // Return OTP for testing
  } catch (error) {
    console.error('Generate OTP error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Verify booking OTP
router.post('/verify-otp', async (req, res) => {
  try {
    const { bookingId, otp } = req.body;
    
    const booking = await Booking.findOne({ _id: bookingId, otp });
    
    if (!booking) {
      return res.status(400).json({ success: false, message: 'Invalid OTP' });
    }
    
    // Check if OTP is expired
    if (booking.otpExpires < new Date()) {
      return res.status(400).json({ success: false, message: 'OTP expired' });
    }
    
    // Confirm booking
    booking.status = 'confirmed';
    booking.otp = undefined;
    booking.otpExpires = undefined;
    await booking.save();
    
    res.json({ success: true, message: 'Booking confirmed successfully' });
  } catch (error) {
    console.error('Verify booking OTP error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Get booking history
router.get('/history', async (req, res) => {
  try {
    // In production, use authentication middleware to get customer ID
    const customerId = req.query.customerId || 'CURRENT_USER_ID';
    
    const bookings = await Booking.find({ customer: customerId })
      .sort({ createdAt: -1 })
      .limit(10);
    
    res.json({ 
      success: true,
      bookings: bookings.map(booking => ({
        _id: booking._id,
        vehicleNumber: booking.vehicleNumber,
        status: booking.status,
        amount: booking.amount,
        createdAt: booking.createdAt,
        paymentStatus: booking.paymentStatus
      }))
    });
  } catch (error) {
    console.error('Booking history error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Get booking details
router.get('/:bookingId', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.bookingId)
      .populate('vehicle', 'vehicleNumber type');
    
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }
    
    res.json({ 
      success: true,
      booking: {
        _id: booking._id,
        vehicleNumber: booking.vehicle.vehicleNumber,
        vehicleType: booking.vehicle.type,
        status: booking.status,
        amount: booking.amount,
        estimatedTime: booking.estimatedTime,
        paymentStatus: booking.paymentStatus,
        pickupLocation: booking.pickupLocation
      }
    });
  } catch (error) {
    console.error('Booking details error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Update booking status (for driver)
router.put('/:bookingId/status', async (req, res) => {
  try {
    const { status } = req.body;
    
    const booking = await Booking.findByIdAndUpdate(
      req.params.bookingId,
      { status },
      { new: true }
    );
    
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }
    
    // Update vehicle status based on booking status
    if (status === 'completed' || status === 'cancelled') {
      await Vehicle.findByIdAndUpdate(booking.vehicle, { status: 'available' });
    }
    
    res.json({ success: true, message: 'Booking status updated successfully' });
  } catch (error) {
    console.error('Update booking status error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Payment success callback
router.post('/payment-success', async (req, res) => {
  try {
    const { bookingId, paymentId, amount } = req.body;
    
    const booking = await Booking.findById(bookingId);
    
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }
    
    // Update payment status
    booking.paymentStatus = 'completed';
    booking.paymentId = paymentId;
    booking.paymentAmount = amount;
    await booking.save();
    
    res.json({ success: true, message: 'Payment recorded successfully' });
  } catch (error) {
    console.error('Payment success error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

export default router;