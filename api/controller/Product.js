const Order = require('../models/order');
const Product= require('../models/Product');
const mongoose = require('mongoose');
exports.createProduct =  (req,res, next)=>{
    console.log(req.body)
    const product = new Product({ 
        _id :new mongoose.Types.ObjectId(),
        productname :req.body.productname,
        productImage:req.file.path,
        CategoryId:req.body.CategoryId,
        SubCategoryId:req.body.SubCategoryId,
        price:req.body.price,
        productdescription:req.body.productdescription,
        displaycategory:req.body.displaycategory,
        displaycategoryid:req.body.displaycategoryid,
        rating:req.body.rating,
        brand:req.body.brand,
        features:req.body.features


     
    });
    product.save().then(result=>{
        console.log(result);
        res.status(200).json({
            message:'Category Store',
            Product:{
                _id : result._id,
                productname :result.productname,
                productImage:result.productImage,
                CategoryId:result.CategoryId,
                SubCategoryId:result.SubCategoryId,
                price:result.price,
                productdescription:result. productdescription,
                displaycategory:result.displaycategory,
                displaycategoryid:result.displaycategoryid,
                rating:result.rating,
                request:{
                    type: "Post",
                    url:'http://localhost:3000/category'+result._id
                }
            }
        })
    }).catch(err=>console.log(err));
    res.redirect('/addProducts');
},
exports.getProducts = (req,res, next)=>{
   
    Product.find()
    .select('productname price _id productImage  productdescription displaycategory displaycategoryid brand features')
    .exec()
    .then(docs =>{
        const response={
            count :docs.length,
            //products:docs
            product:docs.map(doc=>{
                 return{
                    _id : doc._id,
                    productname :doc.productname,
                    productImage:doc.productImage,
                    price:doc.price,
                    productdescription:doc.productdescription,
                    displaycategory:doc.displaycategory,
                    displaycategoryid:doc.displaycategoryid,
                    brand:doc.brand,
                    features:doc.features,

                     request:{
                         type: "GET",
                         url:'http://localhost:3000/product/'+doc._id
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
 exports.getproductbyId= (req,res, next)=>{
    const id = req.params.productId;
    console.log(id);
    Product.findById(id)
    .select('productname price _id productImage  productdescription')
    .exec()
    .then(doc=>{
        console.log(doc);
        res.status(200).json({
            product:doc,
            request:{
                type: "GET",
                url:'http://localhost:3000/product'
            }
        });
})
.catch(err=>{
    console.log(err);
    res.status(500).json({error:err});
});


}
 exports.getwithCat_subcat= (req,res, next)=>{
    const id = req.params.productId;
    console.log(id);
    Product.findById(id)
    .select('productname price _id productImage  productdescription')
    .populate('CategoryId')
    .populate('SubCategoryId')
    .exec()
    .then(doc=>{
        console.log(doc);
        res.status(200).json({
            product:doc,
            request:{
                type: "GET",
                url:'http://localhost:3000/product'
            }
        });
        
})
.catch(err=>{
    console.log(err);
    res.status(500).json({error:err});
});


}
exports.productUpdate= (req,res, next)=>{
    const id = req.params.productId;
    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    Product.update({_id:id},{$set: updateOps}).exec().then(result=>{
        console.log(result);
        res.status(200).json({
            product : result,
            request:{
                type: "PATCH",
                url:'http://localhost:3000/product/'+id
            }
        });
    }).catch(err=>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
    
}
exports.productDelete = (req,res, next)=>{
    const id = req.params.productId;
    Product.remove({ _id:id})
    .exec()
    .then(result=>{
        console.log(result);
        res.status(200).json({
             message:'product delete sucessFully',
            request:{
                type: "Post",
                description:"add some proucts",
                url:'http://localhost:3000/product',
                body: { name:'String', price :'Number'}
            }
        });
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({error:err});
    });
}
exports.productRating =(req,res, next)=>{
  console.log('rating',req.body)
  let productId = req.params.productId
  console.log('productId',productId)
  Product.findByIdAndUpdate(productId,
    {
        rating:req.body.rating
    }
    ).exec().then(result=>{
        console.log(result);
        res.status(200).json({
            product : result,
            request:{
                type: "PATCH",
                url:'http://localhost:3000/product/'+productId
            }
        });
    });
}