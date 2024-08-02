const mongoose = require('mongoose');
const uri = 'mongodb+srv://shahnikunjsbit:nikunj%400014@cluster0.mema0ex.mongodb.net/nodeDemo';


mongoose.set('strictQuery', false); // Optional, depending on your Mongoose configuration

const connectDB = async () => {
  try {
    await mongoose.connect(uri, {
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
