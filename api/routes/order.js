const express  =  require('express');
const router =  express.Router();
const mongoose = require('mongoose');
const Order = require('../models/order');
const Product = require('../models/Product');
const checkAuth = require('../middleware/auth-check');
const orderController = require('../controller/order');
router.get('/', orderController.orders_get_all)
router.post('/createorder', orderController.Create_order)
router.get('/:orderId' , orderController.getorderbyId);
router.get('/getorderbyuserId/:userId' , orderController.getorderbyuserId);
router.patch('/:orderId' , orderController.updateOrder);
router.delete('/:orderId' , orderController.deleteOrder);
router.put('/update-status/:orderId', orderController.updateStatus);
module.exports = router;