const mongoose = require('mongoose')
const carousel= require('../models/carousel')
const cardcarousle = require('../models/card');
exports.createCardcarousel = async (req, res, next) => {
    console.log(req.body);
    if (req.body.backgroundImg === '' && req.body.backgroundcolor === '') {
      console.log("Both backgroundImg and backgroundcolor are empty, breaking...");
      return res.status(400).json({ error: 'Both backgroundImg and backgroundcolor are required' });
    }
  
    let backgroundImgPath;
    if (req.file) {
      backgroundImgPath = req.file.path;
    } else {
      backgroundImgPath = null;
    }
  
    const card = new cardcarousle({
      _id: new mongoose.Types.ObjectId(),
      backgroundImg: backgroundImgPath,
      backgroundcolor: req.body.backgroundcolor,
      title: req.body.title,
      subtitle: req.body.subtitle,
      tagline: req.body.tagline,
      rate: req.body.rate,
      cardIdNo: req.body.cardIdNo,
      CategoryId:req.body.CategoryId,
      SubCategoryId:req.body.SubCategoryId,
    });
  
    card.save().then(result => {
      console.log(result);
      res.status(200).json({
        backgroundImg: result.backgroundImg,
        title: result.title,
        subtitle: result.subtitle,
        tagline: result.tagline,
        rate: result.rate,
        backgroundcolor: req.body.backgroundcolor,
        cardIdNo: req.body.cardIdNo,
        CategoryId:result.CategoryId,
        SubCategoryId:result.SubCategoryId,
      });
    }).catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Error creating card carousel' });
    });
  };

exports.getCardcarousel= async (req,res, next)=>{
   cardcarousle.find()
   .select('backgroundImg title subtitle tagline  rate cardIdNo   backgroundcolor')
   .populate('CategoryId')
   .populate('SubCategoryId')
   .exec()
   .then(docs =>{
    docs.map(result=>{
        return{
            backgroundImg:result.backgroundImg,
            title:result.title,
            subtitle:result.subtitle,
            tagline:result.tagline,
            rate:result.rate,
            backgroundcolor:req.body.backgroundcolor,
            cardIdNo:req.body.cardIdNo
        
        }})
        res.status(200).json(docs);
   })
}
