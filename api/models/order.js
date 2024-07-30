
const mongoose = require('mongoose');


const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    products:[{
        productId:{ type:mongoose.Schema.Types.ObjectId , ref:'Product' , require: true},
        updatequantity:{type:Number, default:1},
       },
    ],
    totalprice:{type:Number, require:true},
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      paymentType:{type: Object,require:true},
      status: [
        {
          userId:{type:String},
          products:{type:Object},
          cancel: {
            type: Boolean,
            default: false
          },
          return: {
            type: Boolean,
            default: false
          },
          received: {
            type: String,
            required: false
          },
          message:{type:String, require:true}
    
        }
      ],
     
   
});
module.exports = mongoose.model('Order',orderSchema);