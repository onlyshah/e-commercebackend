const express  =  require('express');
const router =  express.Router();
const checkAuth = require('../middleware/auth-check');
const multer  = require('multer');
const subcategoryController = require('../controller/SubCategory');
const path = require("path");
const storage  = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/subcategoryImage');
    },
    filename: function (req, file, cb) {
        const date = new Date();
        cb(null, ('subcategory'+date.getUTCFullYear()+'-'+ date.getUTCMonth()+'-'+ date.getDate()+'-'
         +file.originalname).toString())
      }
});
const fileFilter =( req, file , cb)=>{
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg'){
        cb(null, true)
    }
    else{
        cb(null, false)
    }
}

const upload = multer({ storage:storage, limits:{ fileSize:1024*1024*5},
  fileFilter: fileFilter  
});

//router.get('/addSubcategory' ,subcategoryController.getCategory);
router.post('/addSubcategory', upload.single('subcategoryImage'),subcategoryController.createSubCategory);
router.get('/viewSubcategory' , subcategoryController.getSubcategory);
router.get('/viewSubcategory/:subcategorybyId' , subcategoryController.getsubCategorybyId);
module.exports = router;