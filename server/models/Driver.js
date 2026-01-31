// Driver Model
import mongoose from 'mongoose';

const DriverSchema = new mongoose.Schema({
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
  licenseNumber: {
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
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Owner',
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'suspended'],
    default: 'active'
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

DriverSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.model('Driver', DriverSchema);