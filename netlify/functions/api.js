// netlify/functions/api.js
const express = require('express');
const serverless = require('serverless-http');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const connectDB = require('../../db'); // Adjust the path to your db.js file

// Import routes
const productRoutes = require('../../api/routes/Product');
const orderRoutes = require('../../api/routes/order');
const userRoutes = require('../../api/routes/user');
const categoryRoutes = require('../../api/routes/Category');
const subcategoryRoutes = require('../../api/routes/Subcategory');
const addtocartRoutes = require('../../api/routes/addtoCart');
const comanApi = require('../../api/routes/ComanApi');
const wishlistRoutes = require('../../api/routes/Wishlist');
const carouselRoutes = require('../../api/routes/carousel');
const emailRoutes = require('../../api/routes/email');
const cardcarouselRoutes = require('../../api/routes/Cardcarousel');

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));

app.use((req, res, next) => {
   res.header('Access-Control-Allow-Origin', '*');
   res.header('Access-Control-Allow-Headers', '*');

   if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT,POST,PATCH,GET,DELETE');
      return res.status(200).json({});
   }
   next();
});

// Use routes
app.use('/', productRoutes);
app.use('/order', orderRoutes);
app.use('/', userRoutes);
app.use('/', categoryRoutes);
app.use('/', subcategoryRoutes);
app.use('/cart', addtocartRoutes);
app.use('/', comanApi);
app.use('/wishlist', wishlistRoutes);
app.use('/', carouselRoutes);
app.use('/', cardcarouselRoutes);
app.use('/', emailRoutes);

process.on('unhandledRejection', (reason, promise) => {
   console.error('Unhandled Rejection at:', promise, 'reason:', reason);
   // Application specific logging, throwing an error, or other logic here
});

connectDB(); // Connect to MongoDB

module.exports.handler = serverless(app);
