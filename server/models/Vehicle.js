// Vehicle Model
import mongoose from 'mongoose';

const VehicleSchema = new mongoose.Schema({
  vehicleNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  type: {
    type: String,
    required: true,
    enum: ['tractor', 'truck'],
    default: 'tractor'
  },
  model: {
    type: String,
    required: true,
    trim: true
  },
  tankCapacity: {
    type: Number,
    required: true
  },
  rate: {
    type: Number,
    required: true
  },
  rateExpiration: {
    type: Date,
    required: true
  },
  area: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    required: true,
    enum: ['available', 'booked', 'maintenance'],
    default: 'available'
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Owner',
    required: true
  },
  driverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Driver'
  },
  revenue: {
    type: Number,
    default: 0
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

VehicleSchema.pre('save', function(next) {
  this.lastUpdated = Date.now();
  next();
});

export default mongoose.model('Vehicle', VehicleSchema);