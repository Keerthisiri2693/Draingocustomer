// OTP Utility Functions

// Generate a 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Send SMS (mock implementation - in production use a real SMS service)
const sendSMS = async (phoneNumber, message) => {
  console.log(`SMS to ${phoneNumber}: ${message}`);
  // In production, integrate with SMS gateway like Twilio, AWS SNS, etc.
  // Example:
  // const accountSid = process.env.TWILIO_ACCOUNT_SID;
  // const authToken = process.env.TWILIO_AUTH_TOKEN;
  // const client = require('twilio')(accountSid, authToken);
  // await client.messages.create({
  //   body: message,
  //   from: process.env.TWILIO_PHONE_NUMBER,
  //   to: phoneNumber
  // });
  return { success: true };
};

export { generateOTP, sendSMS };