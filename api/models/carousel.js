const mongoose = require("mongoose");
const carouselSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    banner:{type:String, require:true},
    title:{type:String, require:true},
    subtitle:{type:String, require:true},
    tagline:{type:String, require:true},
    rate:{type:Number,require:true}
});
module.exports = mongoose.model('carousel',carouselSchema)