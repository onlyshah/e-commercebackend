const mongoose = require("mongoose");
const addtoCartSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      products:[{
            productId:{ type:mongoose.Schema.Types.ObjectId , ref:'Product' , require: true},
            quantity: {type:Number},
            //price:{type:Number}
        }
]
   
});
module.exports = mongoose.model('addtoCart',addtoCartSchema) 