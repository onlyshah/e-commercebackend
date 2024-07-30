const mongoose = require('mongoose')
const carousel= require('../models/carousel')
const cardcarousle = require('../models/card')
exports.creatCarousel =async (req, res) => {
    console.log(req.file)
    const carouselData = new carousel({
        _id :new mongoose.Types.ObjectId(),
        banner:req.file.path,
        title:req.body.title,
        subtitle:req.body.subtitle,
        tagline:req.body.tagline,
        rate:req.body.rate
    });
    carouselData.save().then(result=>{
        console.log(result);
        res.status(200).json({
            banner:result.banner,
            title:result.title,
            subtitle:result.subtitle,
            tagline:result.tagline,
            rate:result.rate
        })
    })
}
exports.getcarousel= async (req,res, next)=>{
    // const filters = req.query
   carousel.find()
   .select('banner title subtitle tagline  rate')
   .exec()
   .then(docs =>{
    docs.map(result=>{
        return{
           
                banner:result.banner,
                title:result.title,
                subtitle:result.subtitle,
                tagline:result.tagline,
                rate:result.rate
        
        }})
        res.status(200).json(docs);
   })
}
