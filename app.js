const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const connectDB = require('./db'); // Adjust the path to your db.js file
const mongoose = require('mongoose');

// Middleware
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
const allowedOrigins = ['http://localhost:4200','http://localhost:8100',
   'capacitor://localhost',  // For Capacitor apps
   'ionic://localhost',      // For Ionic apps
   'https://onlyshah.github.io'
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('CORS policy does not allow this origin'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))

// Routes
const productRoutes = require('./api/routes/Product');
const orderRoutes = require('./api/routes/order');
const userRoutes = require('./api/routes/user');
const categoryRoutes = require('./api/routes/Category');
const SubcategoryRoutes = require('./api/routes/SubCategory');
const addtocartRoutes = require('./api/routes/addtoCart');
const comanApi = require('./api/routes/ComanApi');
const wishlistRoutes = require('./api/routes/Wishlist');
const carouselRoutes = require('./api/routes/carousel');
const emailRoutes = require('./api/routes/email');
const cardcarouselRoutes = require('./api/routes/Cardcarousel');

app.use('/uploads', express.static('uploads'));

app.use('/', productRoutes);
app.use('/order', orderRoutes);
app.use('/', userRoutes);
app.use('/', categoryRoutes);
app.use('/', SubcategoryRoutes);
app.use('/cart', addtocartRoutes);
app.use('/', comanApi);
app.use('/wishlist', wishlistRoutes);
app.use('/', carouselRoutes);
app.use('/', cardcarouselRoutes);
app.use('/', emailRoutes);

// Error handling for unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

// Connect to MongoDB
connectDB();

// Debugging middleware
app.use((req, res, next) => {
  console.log('CORS Middleware Applied:', req.headers.origin);
  next();
});

module.exports = app;