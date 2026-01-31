// Customer routes implementation
import express from 'express';
const router = express.Router();
import Customer from '../models/Customer.js';
import Booking from '../models/Booking.js';
import Vehicle from '../models/Vehicle.js';
import Feedback from '../models/Feedback.js';
import { generateOTP, sendSMS } from '../utils/otpUtils.js';

// Customer registration
router.post('/register', async (req, res) => {
  try {
    const { name, phoneNumber, address, password } = req.body;
    
    // Check if customer already exists
    const existingCustomer = await Customer.findOne({ phoneNumber });
    if (existingCustomer) {
      return res.status(400).json({ success: false, message: 'Customer already exists' });
    }
    
    // Create new customer
    const customer = new Customer({
      name,
      phoneNumber,
      address,
      password // In production, hash the password
    });
    
    await customer.save();
    
    res.status(201).json({ success: true, message: 'Customer registered successfully' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Send OTP for login
router.post('/send-otp', async (req, res) => {
  try {
    const { phoneNumber } = req.body;
    
    // Check if customer exists
    const customer = await Customer.findOne({ phoneNumber });
    if (!customer) {
      return res.status(404).json({ success: false, message: 'Customer not found' });
    }
    
    // Generate OTP
    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
    
    // Update customer with OTP
    customer.otp = otp;
    customer.otpExpires = otpExpires;
    await customer.save();
    
    // In production, send SMS with OTP
    // await sendSMS(phoneNumber, `Your OTP is: ${otp}`);
    console.log(`OTP for ${phoneNumber}: ${otp}`); // For testing
    
    res.json({ success: true, message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Send OTP error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Verify OTP for login
router.post('/verify-otp', async (req, res) => {
  try {
    const { phoneNumber, otp } = req.body;
    
    // Find customer with OTP
    const customer = await Customer.findOne({ phoneNumber, otp });
    
    if (!customer) {
      return res.status(400).json({ success: false, message: 'Invalid OTP' });
    }
    
    // Check if OTP is expired
    if (customer.otpExpires < new Date()) {
      return res.status(400).json({ success: false, message: 'OTP expired' });
    }
    
    // Clear OTP after successful verification
    customer.otp = undefined;
    customer.otpExpires = undefined;
    await customer.save();
    
    res.json({ 
      success: true, 
      message: 'OTP verified successfully',
      customer: { 
        id: customer._id,
        name: customer.name,
        phoneNumber: customer.phoneNumber,
        address: customer.address
      }
    });
  } catch (error) {
    console.error('Verify OTP error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Get customer profile
router.get('/profile', async (req, res) => {
  try {
    // In production, use authentication middleware to get customer ID
    const customerId = req.query.customerId;
    
    const customer = await Customer.findById(customerId);
    
    if (!customer) {
      return res.status(404).json({ success: false, message: 'Customer not found' });
    }
    
    res.json({ 
      success: true,
      customer: {
        id: customer._id,
        name: customer.name,
        phoneNumber: customer.phoneNumber,
        address: customer.address
      }
    });
  } catch (error) {
    console.error('Profile error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Update customer profile
router.put('/profile', async (req, res) => {
  try {
    const { customerId, name, address } = req.body;
    
    const customer = await Customer.findByIdAndUpdate(
      customerId,
      { name, address },
      { new: true }
    );
    
    if (!customer) {
      return res.status(404).json({ success: false, message: 'Customer not found' });
    }
    
    res.json({ 
      success: true,
      message: 'Profile updated successfully',
      customer: {
        id: customer._id,
        name: customer.name,
        phoneNumber: customer.phoneNumber,
        address: customer.address
      }
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

export default router;