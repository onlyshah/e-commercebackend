const mongoose = require('mongoose');
require('dotenv').config();
mongoose.set('strictQuery', false); // Optional, depending on your Mongoose configuration
console.log("Url",process.env.MONGO_URI)
const connectDB = async () => {
  try {
    mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000,
    });
    console.log('Connected to MongoDBCluster');
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1); // Exit the process with failure
  }
};

module.exports = connectDB;
