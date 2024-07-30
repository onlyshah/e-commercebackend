const mongoose = require('mongoose');

const wishlistSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      List:[{
        productId:{ type:mongoose.Schema.Types.ObjectId , ref:'Product' , require: true}
  
        }
    ],
  
    
   
});
module.exports = mongoose.model('Wishlist ',wishlistSchema);