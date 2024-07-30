const Order = require('../models/order');
const Product = require('../models/Product');
const SubCategory = require('../models/SubCategory');
const mongoose = require("mongoose");
exports.createSubCategory=(req, res , next)=>{
    console.log(req.file)
    const subCategory = new SubCategory({
        _id :new mongoose.Types.ObjectId(),
        subcategoryname :req.body.subcategoryname,
        subcategoryImage:req.file.path,
        CategoryId:req.body.CategoryId
    });
    subCategory.save().then(result =>{
        console.log(result);
        res.status(200).json({
            message:'SubCategory Store',
            subcategoryProduct:{
                subcategoryname: result.subcategoryname,
                subcategoryImage: result.subcategoryImage,
                CategoryId:result.CategoryId,
                _id : result._id,
                request:{
                    type: "Post",
                    url:'http://localhost:3000/subcategory/'+result._id
                }
          }


        })
        
    }).catch(err=>console.log(err));
    res.redirect('/addSubcategory');

}
exports.getSubcategory = (req,res, next)=>{
   
    SubCategory.find()
    .select('subcategoryname')
    .populate('CategoryId')
    .exec()
    .then(docs =>{
        const response={
            count :docs.length,
            //products:docs
            subcategory:docs.map(doc=>{
                 return{
                subcategoryname: doc.subcategoryname,
                subcategoryImage: doc.subcategoryImage,
                CategoryId:doc.CategoryId,
                _id : doc._id,
                     request:{
                         type: "GET",
                         url:'http://localhost:3000/Subcategory/'+doc._id
                     }
                 }
            })
        }
       console.log(docs);
        res.status(200).json(response);
      
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
   
 }
 exports.getsubCategorybyId= (req,res, next)=>{
    const id = req.params.subcategorybyId;
    SubCategory.findById(id)
    .select('subcategoryname subcategoryImage')
    .populate('CategoryId')
    .exec()
    .then(doc=>{
        console.log(doc);
        res.status(200).json({
            Subcategory:doc,
            request:{
                type: "GET",
                url:'http://localhost:3000/viewSubcategory/'+doc._id
            }
        });
        console.log(doc);
        
})
.catch(err=>{
    console.log(err);
    res.status(500).json({error:err});
});


}