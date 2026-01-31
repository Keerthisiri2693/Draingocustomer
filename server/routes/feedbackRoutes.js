// Feedback routes implementation
import express from 'express';
const router = express.Router();
import Feedback from '../models/Feedback.js';
import Booking from '../models/Booking.js';

// Submit feedback
router.post('/', async (req, res) => {
  try {
    const { bookingId, rating, comment } = req.body;
    
    // Check if booking exists
    const booking = await Booking.findById(bookingId);
    
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }
    
    // Create feedback
    const feedback = new Feedback({
      booking: bookingId,
      customer: booking.customer,
      rating,
      comment,
      vehicle: booking.vehicle
    });
    
    await feedback.save();
    
    // Update booking with feedback status
    booking.feedbackGiven = true;
    await booking.save();
    
    res.status(201).json({ success: true, message: 'Feedback submitted successfully' });
  } catch (error) {
    console.error('Feedback submission error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Get feedback for booking
router.get('/booking/:bookingId', async (req, res) => {
  try {
    const feedback = await Feedback.findOne({ booking: req.params.bookingId })
      .populate('customer', 'name');
    
    if (!feedback) {
      return res.status(404).json({ success: false, message: 'Feedback not found' });
    }
    
    res.json({ 
      success: true,
      feedback: {
        rating: feedback.rating,
        comment: feedback.comment,
        customerName: feedback.customer.name,
        createdAt: feedback.createdAt
      }
    });
  } catch (error) {
    console.error('Feedback details error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Get feedback for vehicle
router.get('/vehicle/:vehicleId', async (req, res) => {
  try {
    const feedbacks = await Feedback.find({ vehicle: req.params.vehicleId })
      .populate('customer', 'name')
      .sort({ createdAt: -1 })
      .limit(10);
    
    res.json({ 
      success: true,
      feedbacks: feedbacks.map(feedback => ({
        rating: feedback.rating,
        comment: feedback.comment,
        customerName: feedback.customer.name,
        createdAt: feedback.createdAt
      })),
      averageRating: feedbacks.length > 0 
        ? feedbacks.reduce((sum, f) => sum + f.rating, 0) / feedbacks.length
        : 0
    });
  } catch (error) {
    console.error('Vehicle feedback error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

export default router;