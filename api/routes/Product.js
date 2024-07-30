const  express  =  require('express');
const router =  express.Router();
const mongoose = require('mongoose');
const checkAuth = require('../middleware/auth-check');
const multer = require('multer');
const productController = require('../controller/Product');
const storages  = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/product');
    },
    filename: function (req, file, cb) {
        const date = new Date();
        cb(null, ('product'+date.getUTCFullYear()+'-'+ date.getUTCMonth()+'-'+ date.getDate()+'-' +file.originalname).toString())
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

const upload = multer({  storage:storages, limits:{ fileSize:1024*1024*5},
  fileFilter: fileFilter  
});

router.post('/addproducts', upload.single('productImage'),productController.createProduct);
router.get('/viewProducts' , productController.getProducts);
router.get('/productbyId/:productId' ,productController.getproductbyId);
router.get('/product/:productId' ,productController.getwithCat_subcat);
router.patch('/:productId' ,productController.productUpdate);
router.delete('/:productId' ,productController.productDelete);
router.post('/product/:productId' ,productController.productRating);

module.exports = router;