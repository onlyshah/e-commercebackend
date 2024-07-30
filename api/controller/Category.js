const Category= require('../models/Category');
exports.createCategory = async (req,res, next)=>{
    console.log(req.file.path)
    const category = new Category({ 
        categoryname :req.body.categoryname,
        categorydiscount:req.body.categorydiscount,
        categoryImage:req.file.path,
        
     
    });  
    category.save().then(result=>{
        console.log(result);
        res.status(200).json({
            message:'Category Store',
            category:{
                categoryname: result.categoryname,
                categoryImage: result.categoryImage,
                categorydiscount:result.categorydiscount,
                _id : result._id,
                request:{
                    type: "Post",
                    url:'http://localhost:3000/category'+result._id
                }
            }
        })
    }).catch(err=>console.log(err));
    res.redirect('/addCategory');
}
exports.getCategory = (req,res, next)=>{
    Category.find()
    .select(' id categoryname categorydiscount categoryImage')
    .exec()
    .then(docs =>{
        const response={
            count :docs.length,
            //products:docs
            category:docs.map(doc=>{
                 return{
                    _id : doc._id,
                    categoryname :doc.categoryname,                
                    categorydiscount:doc.categorydiscount,
                    categoryImage:doc.categoryImage,
                    
                     docs:{
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
 exports.getCategorybyId= (req,res, next)=>{
    const id = req.params.categorybyId;
    Category.findById(id)
    .select('categoryname _id ')
    .populate('productId')
    .populate('SubCategoryId')
    .exec()
    .then(doc=>{
        console.log(doc);
        res.status(200).json({
            category:doc,
            request:{
                type: "GET",
                url:'http://localhost:3000/product'
            }
            
        });
        console.log(doc);
            category:doc.map(doc=>{
                 return{
                    _id : doc. _id,
                    categoryname:doc.categoryname,
                    categoryImage : doc.categoryImage,
                    categorydiscount:doc.categorydiscount,
                     request:{
                         type: "GET",
                         url:'http://localhost:3000/categoryId/'+doc. _id
                     }
                 }
    
            }
            )
           
        
})
.catch(err=>{
    console.log(err);
    res.status(500).json({error:err});
});


}