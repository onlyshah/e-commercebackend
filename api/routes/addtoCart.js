const express = require('express');
const router = express.Router();
const Auth = require('../middleware/auth-check')
const Cart = require('../controller/addtoCart')

router.post('/addtocart', Cart.addtoCart)
router.get('/getcart/:userId', Cart.getcartprouduct)
router.put('/updatecart', Cart.updatecartquantity)
router.delete('/deletecartitem/:userId/:productId', Cart.deletecartproduct)
router.delete('/deleteByuId/:userId', Cart.deleteCartByUserId);

module.exports = router;