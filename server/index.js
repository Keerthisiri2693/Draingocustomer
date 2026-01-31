// Main server entry point
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
import config from './config/config.js';
const envConfig = config[process.env.NODE_ENV || 'development'];

const connectDB = async () => {
  try {
    await mongoose.connect(envConfig.mongodbUri);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};


// Routes
import customerRoutes from './routes/customerRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import vehicleRoutes from './routes/vehicleRoutes.js';
import feedbackRoutes from './routes/feedbackRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import driverRoutes from './routes/driverRoutes.js';

app.use('/api/customers', customerRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/drivers', driverRoutes);

// Basic health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date() });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API Base URL: ${process.env.API_BASE_URL}`);
  console.log(`Server process ID: ${process.pid}`);
  connectDB();
});

// Add error handling for server
app.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use by another process`);
    console.error('This usually happens when multiple instances of the server are running');
  } else {
    console.error('Server error:', error);
  }
});

export default app;