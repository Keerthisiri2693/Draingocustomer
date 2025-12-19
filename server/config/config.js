// Server configuration
module.exports = {
  development: {
    port: process.env.PORT || 5000,
    mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/drain_app',
    jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret_key_here',
    jwtExpire: process.env.JWT_EXPIRE || '30d',
  },
  production: {
    port: process.env.PORT || 5000,
    mongodbUri: process.env.MONGODB_URI,
    jwtSecret: process.env.JWT_SECRET,
    jwtExpire: process.env.JWT_EXPIRE,
  },
  test: {
    port: process.env.PORT || 5001,
    mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/drain_app_test',
    jwtSecret: process.env.JWT_SECRET || 'test_jwt_secret_key',
    jwtExpire: process.env.JWT_EXPIRE || '1d',
  }
};