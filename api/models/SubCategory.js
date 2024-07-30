const mongoose = require("mongoose");
const subcategorySchema = mongoose.Schema({
     _id: mongoose.Schema.Types.ObjectId,
     subcategoryname: {type:String, require:true},
     subcategoryImage:{type:String, require:true},
     CategoryId:{type:mongoose.Schema.Types.ObjectId , ref:'Category' , require: true}

});
module.exports = mongoose.model('SubCategory',subcategorySchema) 