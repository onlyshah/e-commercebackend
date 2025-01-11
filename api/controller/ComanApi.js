const express  =  require('express');
const Product = require('../models/Product');
const Category= require('../models/Category');
const mongoose = require('mongoose');
const SubCategory = require('../models/SubCategory');   
const carddata = require('../models/card')

exports.getall= (req,res, next)=>{  // all product /category/ subcategory

    const pageSize = +req.query.pageSize || 10; // Default page size of 10
    const pageNumber = +req.query.page || 1;    // Default page number is 1

    const filters = req.query;
    // const filters = req.query
   Product.find()
   .select('productname price _id productImage  productdescription displaycategory displaycategoryid brand features')
   .populate('CategoryId')
   .populate('SubCategoryId')
   .skip((pageNumber - 1) * pageSize)   // Skip previous pages
   .limit(pageSize)   
   .exec()
   .then(docs =>{
       const response={
           count :docs.length,
           //products:docs
           product:docs.map(doc=>{
                return{
                    productname : doc.productname,
                    productImage:doc.productImage,
                    price : doc.price,
                    CategoryId:doc.CategoryId,
                    SubCategoryId:doc.SubCategoryId,
                    productdescription:doc.productdescription,
                    displaycategory:doc.displaycategory,
                    displaycategoryid:doc.displaycategoryid,
                    brand:doc.brand,
                    features:doc.features,
                    _id : doc._id,
                    request:{
                        type: "GET",
                        url:'http://localhost:3000/product'+doc._id
                    }
                }
           })
       }

        // res.send(data);
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
exports.searchval = async (req, res, next) => {
    console.log("Query Param : ", req.query);
    try {
        const queryParam = req.query.searchValue.toLowerCase();
        console.log("Query Param : ", queryParam);

        const allProducts = await Product.find({})
            .populate('CategoryId', 'categoryname categorydiscount')
            .populate('SubCategoryId', 'subcategoryname');

        // Filter products with case-insensitive comparison for all fields
        const filteredProducts = allProducts.filter(product => {
            const lowerCaseProduct = {
                ...product._doc, // to access the document properties
                productname: (product.productname || '').toString().toLowerCase(),
                price: (product.price || '').toString().toLowerCase(),
                brand: (product.brand || '').toString().toLowerCase(),
                productdescription: (product.productdescription || '').toString().toLowerCase(),
                displaycategory: (product.displaycategory || '').toString().toLowerCase(),
                features: product.features ? JSON.stringify(product.features).toLowerCase() : ''
            };
            // Check if the queryParam matches any value in the features object
            const featuresMatch = Object.values(lowerCaseProduct.features).some(feature =>
                feature.toString().toLowerCase().includes(queryParam)
            );
            return (
                lowerCaseProduct.productname.includes(queryParam) ||
                lowerCaseProduct.price.includes(queryParam) ||
                lowerCaseProduct.brand.includes(queryParam) ||
                lowerCaseProduct.productdescription.includes(queryParam) ||
                lowerCaseProduct.displaycategory.includes(queryParam) ||
                lowerCaseProduct.features.includes(queryParam) ||
                (product.CategoryId && product.CategoryId.categoryname.toLowerCase().includes(queryParam)) ||
                (product.SubCategoryId && product.SubCategoryId.subcategoryname.toLowerCase().includes(queryParam))||
                featuresMatch
            );
        });

        res.json(filteredProducts);
        console.log(filteredProducts);

    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getallbyId= (req,res, next)=>{
    const id = req.params.id;
    console.log(id);
    Product.findById(id)
    .select('productname price _id productImage  productdescription displaycategory displaycategoryid brand features')
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
       res.status(500).json({
           error:err
       });
   });
}



