var express = require('express');
var app = express();
app.use(express.json());
var cors = require('cors');
app.use(cors());
app.use(express.json());
var morgan = require('morgan');
var bodyParser = require('body-parser');
var productRoutes = require('./api/routes/Product');
var orderRoutes = require('./api/routes/order');
var userRoutes = require('./api/routes/user');
var categoryRoutes = require('./api/routes/Category');
var SubcategoryRoutes = require('./api/routes/SubCategory');
var addtocartRoutes = require('./api/routes/addtoCart');
var comanApi = require('./api/routes/ComanApi');
var wishlistRoutes = require('./api/routes/Wishlist');
var carouselRoutes = require('./api/routes/carousel')
var emailRoutes = require('./api/routes/email')
var cardcarouselRoutes = require('./api/routes/Cardcarousel')
const connectDB = require('./db'); // Adjust the path to your db.js file
//var mongoose = require('mongoose');
// app.use(express.static((__dirname+'/views')));
//mongoose.connect('mongodb://127.0.0.1:27017/nodeDemo');
connectDB(); // Connect to MongoDB
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));
app.use((req, res, next) => {
   res.header('Access-Control-Allow-Origin', '*');
   res.header('Access-Control-Allow-Header', '*');
   

   if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Method', 'PUT,POST,PATCH,GET,DELETE');
      return res.status(200).json({})
   }
   res.header('Content-Type', 'application/json');
   req.setTimeout(60000); 
   next();
});
app.use('/', productRoutes);
app.use('/order', orderRoutes);
app.use('/', userRoutes);
app.use('/', categoryRoutes);
app.use('/', SubcategoryRoutes);
app.use('/cart', addtocartRoutes);
app.use('/', comanApi);
app.use('/wishlist', wishlistRoutes);
app.use('/', carouselRoutes)
app.use('/', cardcarouselRoutes)
app.use('/', emailRoutes)

process.on('unhandledRejection', (reason, promise) => {
   console.error('Unhandled Rejection at:', promise, 'reason:', reason);
   // Application specific logging, throwing an error, or other logic here
 });
module.exports = app;
