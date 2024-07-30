const express  =  require('express');
const comanapiController = require('../controller/ComanApi');
const router =  express.Router();
router.get('/getall' ,comanapiController.getall);
router.get('/search' ,comanapiController.searchval);
router.get('/getallbyId/:id' ,comanapiController.getallbyId);

 
 
 

module.exports = router;