const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    productname: {type:String, require:true},
    price:{type:Number, require:true},
    CategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
      },
      SubCategoryId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'SubCategory',
          required: false
      },
      productImage:{type:String, require:false},
      productdescription:{type:String, require:true},
      displaycategory:{type:String ,require:true},
      displaycategoryid:{type:Number,require:true},
      stock: {
        type: Number,
        required: true
      },
      ratings: [
        {
          user: { type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true },
          rating: { type: Number, min: 1, max: 5 },
          comment: { type: String, trim: true }
        }
      ],
      brand:{type:String, require:true},
      features: { type: Object, default: void 0 }
});
module.exports = mongoose.model('Product',productSchema);