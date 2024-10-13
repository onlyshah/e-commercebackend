const mongoose = require("mongoose");
const { count } = require("../models/addtoCart");
const Cart = require("../models/addtoCart");



exports.addtoCart = async (req, res) => {
  // console.log('res',req);
  // let userId =JSON.parse(req.body.userId); 
  let userId = req.body.userId
  let prodata =[];
  let  proId;
  prodata.push(req.body.products)
  prodata.forEach(element => {
  proId= element.productId,
  quantityamt = element.quantity
  
  });
  try{
    let cart = await Cart.findOne({ userId });
    if(cart){
      // productId = mongoose.Types.ObjectId(productId)
      let itemIndex = cart.products.findIndex(p => p.productId == proId);
     if(itemIndex > -1){
      let productItem = cart.products[itemIndex];
      console.log('productItem',productItem.quantity)
      productItem.quantity =JSON.parse(productItem.quantity)+JSON.parse(quantityamt);
      cart.products[itemIndex] = productItem;
      console.log('cart', cart.products[itemIndex] = productItem)
      cart.save()
      res.send('product is alrady in cart and quantity will be increase')
     }
     else {
      //product does not exists in cart, add new item
      let data = [];
      data.push(req.body.products)
       data.map( el =>
        {productId=el.productId,
         quantity=el.quantity
         //price=el.price
        }
    
      )
      cart.products.push({ productId, quantity });
      cart.save();
    
  
    }
    
    } 
     else {
      //no cart for user, create new cart
      const newCart = await Cart.create({
        _id: new mongoose.Types.ObjectId(),
         userId: req.body.userId,
         products: req.body.products,
      });

      return res.status(201).json({newCart});
    }
    
  }
  catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
  }
  exports.getcartprouduct = async (req ,res ) =>{
    let userId = req.params.userId;
    console.log('userId', userId);
  
    try {
      const docs = await Cart.find({ 'userId': userId })
        .populate('products.productId')
        .exec();
  
      if (!docs || docs.length === 0) {
        return res.status(404).json({
          message: 'Your Cart is Empty'
        });
      }
      const products = docs[0].products;
      const productCount = products.length;
      res.send({
      products: products,
      productCount: productCount
      });
      
    } catch (err) {
      console.log(err);
      res.status(500).json({
        error: err
      });
    }
  };
  
  exports.updatecartquantity=async (req,res, next)=>{
    let userId = req.body.userId;
    let cart = await Cart.findOne({ userId });
    let prodata =[];
    let  proId;
    prodata.push(req.body.products)
    prodata.forEach(element => {
    proId= element.productId,
    quantityamt = element.quantity
    
    });
    if(cart){
      let itemIndex = cart.products.findIndex(p => p.productId == proId);
      if(itemIndex > -1){
       let productItem = cart.products[itemIndex];
       console.log('req',productItem)
       console.log('productItem',productItem.quantity)
       productItem.quantity =JSON.parse(quantityamt);
       cart.products[itemIndex] = productItem;
       console.log('cart', cart.products[itemIndex] = productItem)
       cart.save()
       res.send('cart is sucessFully update')
      }

    }
   
   
   
  }


exports.deletecartproduct = (req, res, next) => {
  const userId = req.params.userId;
  const productId = req.params.productId;

  // Ensure productId is provided in the request body
  if (!productId) {
      return res.status(400).json({ message: 'Product Id is required' });
  }

  Cart.findOneAndUpdate(
      { userId: userId },
      { $pull: { products: { productId: productId } } },
      { new: true } // To return the updated document
  )
  .exec()
  .then(updatedcart => {
      if (updatedcart) {
          res.status(200).json({
              message: 'Product removed successfully',
              request: {
                  type: 'DELETE',
                  description: 'Delete product from wishlist',
                  url: `http://localhost:3000/cart/deletecartitem/${userId}/${productId}`,
                  params: { userId:userId , productId: productId }
         
                }
          });
      } else {
          res.status(404).json({
              message: 'Product not found in wishlist or already removed'
          });
      }
  })
  .catch(err => {
      console.error(err);
      res.status(500).json({ error: err });
  });
};



exports.deleteCartByUserId = async (req, res, next) => {
  const userId = req.params.userId;

  try {
    const result = await Cart.deleteMany({ userId: userId }); // Use deleteMany if you expect multiple cart items per user

    if (result.deletedCount > 0) {
      return res.status(200).json({ message: 'Cart items deleted successfully' });
    } else {
      return res.status(404).json({ message: 'No cart items found for this user' });
    }
  } catch (error) {
    next(error);
  }
};
exports.checkcart = async (req, res) => {
  const { userId, productId } = req.body;

  try {
      // Check if the user has the product in their wishlist
      const card = await Cart.findOne({ userId, "List.productId": productId });

      if (C) {
          return res.status(200).json({ success: true, message: 'Product is in wishlist' });
      } else {
          return res.status(200).json({ success: false, message: 'Product is not in wishlist' });
      }
  } catch (error) {
      return res.status(500).json({ success: false, message: 'Server error', error });
  }
}

