// Script to create an admin user
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Admin = require('./server/models/Admin');

// Load environment variables
dotenv.config();

// Database connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
    return true;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    return false;
  }
};

// Create admin user
const createAdmin = async () => {
  try {
    const connected = await connectDB();
    if (!connected) {
      console.log('Could not connect to database');
      return;
    }

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ username: 'admin' });
    
    if (existingAdmin) {
      console.log('Admin user already exists:');
      console.log('Username: admin');
      console.log('Password: admin123');
      return;
    }

    // Create new admin
    const admin = new Admin({
      username: 'admin',
      password: 'admin123',
      email: 'admin@example.com',
      role: 'superadmin'
    });

    await admin.save();
    console.log('Admin user created successfully:');
    console.log('Username: admin');
    console.log('Password: admin123');
    
  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Database connection closed');
  }
};

createAdmin();