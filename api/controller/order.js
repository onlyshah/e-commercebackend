const Order = require('../models/order');
const mongoose = require('mongoose');
// const Razorpay = require('razorpay');
exports.orders_get_all =  (req,res, next)=>{
    Order.find()
    .select( 'quantity')
    .populate('product')
    .exec()
    .then(docs =>{
        console.log(docs);
        res.status(200).json({
            count: docs.length,
            order:docs.map(doc=>{
                return{
                    _id :doc._id,
                    prodcut:doc.product,
                    quantity:doc.quantity,
                    paymentType:req.body.paymentType,
                    request:{
                        type:"GET",
                        url:"http://localhost:3000/order"
                    }
                   
      
                }
            })
                
        });
}).catch(err=>{
    res.status(200).json({
        error:err
    });
});
}
exports.Create_order = async (req, res, next) => {
    try {
      // Assuming `products` is an array of objects with `productId` and `quantity` fields
      const products = req.body.products;
      
      // Map products to the desired structure
      const mappedProducts = products.map(product => ({
        productId: mongoose.Types.ObjectId(product.productId),
        updatequantity: product.quantity
      }));
  
      // Create new order
      const order = new Order({
        _id: new mongoose.Types.ObjectId(),
        products: mappedProducts,
        totalprice: req.body.totalprice,
        userId: mongoose.Types.ObjectId(req.body.userId),
        paymentType: req.body.paymentType,
        status:req.body.status
      });
       console.log('order',order)
      //Save order to the database
      const savedOrder = await order.save();
     // console.log("Order saved successfully", savedOrder);
  
      res.status(200).json({
        message: 'Order stored successfully',
        order: savedOrder
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: 'An error occurred while creating the order',
        error: error.message
      });
    }
  };
exports.getorderbyId =  (req,res, next)=>{
    const id = req.params.orderId;
    Order.findById(id)
    .select('quantity')
    .populate('product')
    .exec()
    .then(doc=>{
        console.log(doc);
        res.status(200).json({
            order:doc,
            request:{
                type: "GET",
                url:'http://localhost:3000/order'+doc._id
            }
        });
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({error:err});
    });

}
exports.getorderbyuserId =  (req,res, next)=>{
    let userId = req.params.userId;
    console.log('userId',userId)
    Order.find({'userId': userId})
    .populate('products.productId')
    .exec()
    .then(docs =>{
       // res.send(docs)
      const mappedProducts = docs.map(item => {
       //res.send(item)
       let data =  item.products.map(product => {
        console.log(product.productId)
         return {
                id: product.productId._id,
                productName: product.productId.productname,
                price: product.productId.price,
                categoryId: product.productId.CategoryId,
                subCategoryId: product.productId.SubCategoryId,
                productImage: product.productId.productImage,
                productDescription: product.productId.productdescription,
                displayCategory: product.productId.displaycategory,
                brand: product.productId.brand,
                features:product.productId.features,
                quantity: product.updatequantity
              };
            });
            const status = item.status.map(statusItem => ({
              userId: statusItem.userId,
              products: data, // Assuming all products in the order are associated with this status
              cancel: statusItem.cancel,
              return: statusItem.return,
              received: statusItem.received,
              message: statusItem.message,
              _id: statusItem._id
            }));
    
            return {
                id: item._id,
                products: data,
                totalPrice: item.totalprice,
                userId: item.userId,
                status:status
            };
        })
      

    res.send(mappedProducts)
   
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        });
    });

}
exports.updateOrder = (req,res, next)=>{
    const id = req.params.orderId;
    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    Order.update({_id:id},{$set: updateOps})
    .exec()
    .populate('product')
    .then(result=>{
        console.log(result);
        res.status(200).json({
            order : result,
            request:{
                type: "PATCH",
                url:'http://localhost:3000/order/'+id
            }
        });
    }).catch(err=>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}
exports.deleteOrder = (req,res, next)=>{
    const id = req.params.orderId;
    Order.remove({ _id:id})
    .populate('product')
    .exec()
    .then(result=>{
        console.log(result);
        res.status(200).json({
             message:'order delete sucessFully',
            request:{
                type: "Post",
                description:"add deleted  proucts ",
                url:'http://localhost:3000/order',
                body: { name:'String', price :'Number'}
            }
        });
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({error:err});
    });
}
// Update order status
exports.updateStatus = async (req, res) => {
  const { orderId } = req.params;

  try {
    // Find the order by its ID
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Update the status fields only (not pushing new statuses)
    if (typeof req.body.cancel !== 'undefined') {
      order.status.cancel = req.body.cancel;
    }
    if (typeof req.body.return !== 'undefined') {
      order.status.return = req.body.return;
    }
    if (typeof req.body.received !== 'undefined') {
      order.status.received = req.body.received;
    }
    if (typeof req.body.message !== 'undefined') {
      order.status.message = req.body.message;
    }

    // Save the updated order
    await order.save();

    res.status(200).json({
      message: 'Order status updated successfully',
      order,
      request: {
        type: 'PATCH',
        url: `http://localhost:3000/order/update-status/${orderId}`
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error
    });
  }
};
