const mongoose = require("mongoose");
const CardSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    backgroundImg:{type:String, require:false},
    backgroundcolor:{type:String, require:false},
    title:{type:String, require:true},
    subtitle:{type:String, require:true},
    tagline:{type:String, require:true},
    rate:{type:Number,require:true},
    cardIdNo:{type:Number,require:true},
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
});
module.exports = mongoose.model('Card',CardSchema)
