const express  =  require('express');
const router =  express.Router();
const checkAuth = require('../middleware/auth-check');
const wishlistController = require('../controller/WishList');

router.post('/createwishlist', wishlistController.addtoWishlist);
router.get('/getwishlist/:userId',wishlistController.getwishList);
router.delete('/deletewishlist/:userId/:productId',wishlistController.deletewishlist);
module.exports = router;