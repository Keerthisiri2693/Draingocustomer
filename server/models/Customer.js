// Customer Model
import mongoose from 'mongoose';

const CustomerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  address: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  otp: {
    type: String
  },
  otpExpires: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

CustomerSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.model('Customer', CustomerSchema);