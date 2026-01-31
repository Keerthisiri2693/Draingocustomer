// Feedback Model
import mongoose from 'mongoose';

const FeedbackSchema = new mongoose.Schema({
  booking: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking',
    required: true
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true
  },
  vehicle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vehicle',
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Feedback', FeedbackSchema);