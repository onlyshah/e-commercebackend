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
var SubcategoryRoutes = require('./api/routes/Subcategory');
var addtocartRoutes = require('./api/routes/addtoCart');
var comanApi = require('./api/routes/ComanApi');
var wishlistRoutes = require('./api/routes/Wishlist');
var carouselRoutes = require('./api/routes/carousel')
var emailRoutes = require('./api/routes/email')
var cardcarouselRoutes = require('./api/routes/Cardcarousel')
var mongoose = require('mongoose');
mongoose.set('strictQuery', true)
// app.use(express.static((__dirname+'/views')));
mongoose.connect('mongodb://127.0.0.1:27017/nodeDemo');

// const { MongoClient, ServerApiVersion } = require('mongodb');
// const urL = "mongodb+srv://shahnikunjsbit:nikunj%400014@cluster0.mema0ex.mongodb.net/";

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(urL, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });
// mongoose.connect(urL, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);


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
// app.use((req,res,next)=>{
//     var error = new Error('Not Found');
//     error.status=404;
//     next(error);
// })
// app.use((error,req,res,next)=>{
//     res.status(error.status|| 500);
//     res.json({
//         error:{
//             message:error.message
//         }
//     })
// })
// // app.use((req,res,next)=>{
// //     res.status(200).json({
// //        message:'It Works !'
// //     });
// // })
module.exports = app;
