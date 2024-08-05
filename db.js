const mongoose = require('mongoose');

const MONGO_URI = 'mongodb+srv://shahnikunjsbit:nikunj%400014@cluster0.mema0ex.mongodb.net/nodeDemo';
// Check for MONGO_URI
mongoose.set('strictQuery', false); // Optional, depending on your Mongoose configuration

const connectDB = async () => {
  try {
    mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDBCluster');
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1); // Exit the process with failure
  }
};

module.exports = connectDB;
