const express  =  require('express');
const router =  express.Router();
const checkAuth = require('../middleware/auth-check');
const CardcarouselControllter  = require('../controller/Cardcarousel');
const multer = require('multer');
const storages  = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/cardImages');
    },
    filename: function (req, file, cb) {
        const date = new Date();
        cb(null, ('backgroundImg'+date.getUTCFullYear()+'-'+ date.getUTCMonth()+'-'+ date.getDate()+'-' +file.originalname).toString())
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
router.get('/getcardcarousel' ,CardcarouselControllter.getCardcarousel);
router.post('/createcardcarousel' ,upload.single('backgroundImg'), CardcarouselControllter.createCardcarousel);
module.exports = router;

