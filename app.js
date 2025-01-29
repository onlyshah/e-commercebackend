let  express = require('express');
let  app = express();
app.use(express.json());
const allowedOrigins = ['http://localhost:4200', 'https://onlyshah.github.io'];

app.use(cors({
   origin: function (origin, callback) {
       if (!origin || allowedOrigins.includes(origin)) {
           callback(null, true);
       } else {
           callback(new Error('CORS policy does not allow this origin'));
       }
   },
   methods: ['GET', 'POST', 'PUT', 'DELETE'],
   allowedHeaders: ['Content-Type', 'Authorization'],
   credentials: true
}));

app.options('*', cors()); // Enable CORS preflight for all routes


app.use(express.json());
let  morgan = require('morgan');
let  bodyParser = require('body-parser');
let  productRoutes = require('./api/routes/Product');
let  orderRoutes = require('./api/routes/order');
let  userRoutes = require('./api/routes/user');
let  categoryRoutes = require('./api/routes/Category');
let  SubcategoryRoutes = require('./api/routes/SubCategory');
let  addtocartRoutes = require('./api/routes/addtoCart');
let  comanApi = require('./api/routes/ComanApi');
let  wishlistRoutes = require('./api/routes/Wishlist');
let  carouselRoutes = require('./api/routes/carousel')
let  emailRoutes = require('./api/routes/email')
let  cardcarouselRoutes = require('./api/routes/Cardcarousel')
const connectDB = require('./db'); // Adjust the path to your db.js file
let  mongoose = require('mongoose');
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
 const authMiddleware = require('./api/middleware/auth-check')
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
app.use((req, res, next) => {
   console.log('CORS Middleware Applied:', req.headers.origin);
   next();
 });
//app.use(authMiddleware); 
process.on('unhandledRejection', (reason, promise) => {
   console.error('Unhandled Rejection at:', promise, 'reason:', reason);
   // Application specific logging, throwing an error, or other logic here
 });
module.exports = app;
