// Owner Detection and Utility Functions
const Owner = require('../models/Owner');
const Vehicle = require('../models/Vehicle');

// Owner detection logic - when driver registers multiple vehicles with same phone number
const detectOwner = async (phoneNumber) => {
  try {
    // Check if this phone number already has multiple vehicles registered
    const vehicleCount = await Vehicle.countDocuments({ 
      'driverPhone': phoneNumber 
    });
    
    // If 2 or more vehicles are registered with same phone number, consider as owner
    if (vehicleCount >= 2) {
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Error in owner detection:', error);
    return false;
  }
};

// Check if user is owner by phone number
const isOwnerByPhone = async (phoneNumber) => {
  try {
    const owner = await Owner.findOne({ phoneNumber });
    return !!owner;
  } catch (error) {
    console.error('Error checking owner status:', error);
    return false;
  }
};

// Validate rate with 6-month expiration
const validateRate = (rateExpiration) => {
  const currentDate = new Date();
  const expirationDate = new Date(rateExpiration);
  
  // Check if rate is expired (more than 6 months old)
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
  
  return expirationDate >= sixMonthsAgo;
};

// Check if rate renewal reminder is needed
const needsRateRenewalReminder = (rateExpiration) => {
  const currentDate = new Date();
  const expirationDate = new Date(rateExpiration);
  
  // Check if rate is about to expire (within 1 month)
  const oneMonthFromNow = new Date();
  oneMonthFromNow.setMonth(oneMonthFromNow.getMonth() + 1);
  
  return expirationDate <= oneMonthFromNow && expirationDate >= currentDate;
};

module.exports = {
  detectOwner,
  isOwnerByPhone,
  validateRate,
  needsRateRenewalReminder
};