const express  =  require('express');
const router =  express.Router();
const multer  = require('multer');
const categoryController = require('../controller/Category');
//const path = require("path");
const storage  = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/categoryImages');
    },
    filename: function (req, file, cb) {
        const date = new Date();
        cb(null, ('category'+date.getUTCFullYear()+'-'+ date.getUTCMonth()+'-'+ date.getDate()+'-' +file.originalname).toString())
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

const upload = multer({ storage: storage, limits:{ fileSize:1024*1024*5},
  fileFilter: fileFilter  
});+ 



router.post('/addCategory', upload.single('categoryImage'),categoryController.createCategory,
);
router.get('/getcategory' , categoryController.getCategory);
// router.get('/category/:catgeoryById' , categoryController.getCategorybyId);

module.exports = router;