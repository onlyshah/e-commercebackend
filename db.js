const mongoose = require('mongoose');
require('dotenv').config();
mongoose.set('strictQuery', false); // Optional, depending on your Mongoose configuration
console.log("Url",process.env.MONGO_URI)
const connectDB = async (retries = 5) => {
  while (retries) {
    try {
      await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 60000,
        socketTimeoutMS: 60000,
      });
      console.log('Connected to MongoDBCluster');
      break; // Exit loop if successful
    } catch (err) {
      console.error(`Failed to connect to MongoDB. Retries left: ${retries}`, err);
      retries -= 1;
      if (retries === 0) process.exit(1); // Exit process if no retries left
      await new Promise(res => setTimeout(res, 5000)); // Wait 5 seconds before retrying
    }
  }
};

module.exports = connectDB;
