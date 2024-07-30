const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
     categoryname: {type:String, require:true},
     categoryImage:{type:String, require:true},
     categorydiscount:{type:String},
   
   
});
const Category =  mongoose.model('Category', categorySchema);
module.exports = Category;