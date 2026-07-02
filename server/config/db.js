const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Database connection error: ${error.message}`);
    console.log('Attempting connection to local MongoDB fallback...');
    try {
      const localConn = await mongoose.connect('mongodb://127.0.0.1:27017/veloce');
      console.log(`MongoDB Connected (Local Fallback): ${localConn.connection.host}`);
    } catch (localError) {
      console.error(`Local MongoDB fallback failed: ${localError.message}`);
      console.log('Server is starting without a database connection. Database features will be unavailable.');
    }
  }
};

module.exports = connectDB;
