// Main server entry point
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const config = require('./config/config');
const envConfig = config[process.env.NODE_ENV || 'development'];

const connectDB = async () => {
  try {
    await mongoose.connect(envConfig.mongodbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Routes
app.use('/api/customers', require('./routes/customerRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));
app.use('/api/vehicles', require('./routes/vehicleRoutes'));
app.use('/api/feedback', require('./routes/feedbackRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/drivers', require('./routes/driverRoutes'));

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

module.exports = app;