exports.getproductbyCategory=  async(req,res)=>{
    const id = req.params.getproductbycatId;
    console.log("p",req.params.getproductbycatId);
   Product.find({'Id': id})
   .select(' productname price _id productImage productdescription displaycategory displaycategoryid' )
   .populate('CategoryId')
   .populate('SubCategoryId')
   .exec()
   .then(docs =>{
       const response={
           count :docs.length,
           //products:docs
           product:docs.map(doc=>{
                return{
                    productname : doc.productname,
                    productImage:doc.productImage,
                    price : doc.price,
                    CategoryId:doc.CategoryId,
                    SubCategoryId:doc.SubCategoryId,
                    productdescription:doc.productdescription,
                    _id : doc._id,
                    request:{
                        type: "GET",
                        url:'http://localhost:3000/product'+doc._id
                    }
                }
           })
       }

        // res.send(data);
       console.log(docs);
    res.status(200).json(response);
     // res.render('addSubcategory', {data:response});
      //res.status(200).json(docs);
   })
   .catch(err=>{
       console.log(err);
       res.status(500).json({
           error:err
       });
   });
}
exports.getproductbycatId = async(req,res, next)=>{
    const id =""+ req.params.getproductbycatId;
    console.log((JSON.stringify(id)));
   Product.aggregate([

        { $match: { CategoryId: mongoose.Types.ObjectId(id) }},
        { $match: { SubCategoryId: mongoose.Types.ObjectId(id) }},
          
     ]).exec()
    .then(docs =>{
        res.status(200).json(docs);
        console.log(docs);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
         error:err
        });
    });
    //    console.log(user);
    
}
exports.getproductbyId = async(req,res, next)=>{
    const id =""+ req.params.getproductbycatId;
    console.log((JSON.stringify(id)));
   Product.aggregate([

        { $match: { CategoryId: mongoose.Types.ObjectId(id) }},
          
     ]).exec()
    .then(docs =>{
        res.status(200).json(docs);
        console.log(docs);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
    //    console.log(user);
    
}

 exports.Search= (req, res, next) => {
    const Keyword =""+ req.body.Keyword.trim();
    console.log(Keyword);
    
  }

   
  try {
    let cart = await Cart.findOne({userId: req.body.userId });
    let productId = await Cart.findOne({productId:req.body.cartItems.productId});
    // console.log('userid',cart);
    // console.log('productId',productId)
    if (cart) {
      let itemIndex = cart.cartItems.findIndex(p => p.productId == productId);
      // console.log('productId',itemIndex)
      if (itemIndex > -1) {
        let productItem = cart.cartItems[itemIndex];
        productItem.quantity = quantity;
        console.log('product',productItem)

      }
      // req.body.cartItems.forEach(element => {
      //   const  item = cart.cartItems.find(p =>p.productId == element.productId);
      //   if(item)
      //   {
      //    Cart.findOneAndUpdate({userId: req.body.userId},{
      //     $push:{
           
      //         ...req.body.cartItems,
      //          quantity:item.quantity+req.body.quantity
          
      //     }
      //    })
         
      //   }
      // });
     
    } 
    else {
      //no cart for user, create new cart
      const cart = new Cart({
                _id: new mongoose.Types.ObjectId(),
                userId: req.body.userId,
                cartItems: req.body.cartItems,
              });
              cart.save().then((cart) => {
                if (cart) {
                  res.status(201).json({ cart });
                }
              });

      return res.status(201).send(cart);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
//   if(cart){  
//     console.log('hello',cart) 
//   }
//   else{
//     const cart = new Cart({
//         _id: new mongoose.Types.ObjectId(),
//         userId: req.body.userId,
//         cartItems: req.body.cartItems,
//       });
//       cart.save().then((cart) => {
//         if (cart) {
//           res.status(201).json({ cart });
//         }
//       });

//   }



exports.addtoCart = async (req, res) => {
  let userId = req.body.userId;
  console.log('res',userId);
  req.body.products.forEach(element => {
  productId= element.productId,
  quantityamt = element.quantity
  
  });
  console.log('res',productId);
  try{
    let cart = await Cart.findOne({ userId });
    if(cart){
      let itemIndex = cart.products.findIndex(p => p.productId == productId);
     if(itemIndex > -1){
      let productItem = cart.products[itemIndex];
      console.log(productItem);
      quantity =JSON.parse(productItem.quantity)+JSON.parse(quantityamt);
      console.log(quantity)
     
     }
    }
  }
  catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }


  
  }
  this.cart.items.map((item)=>{
    this.cart.totalPrice += item.price * item.quantity
 })
 
         // res.send(data);
        // console.log(docs);
        // res.status(200).json(response);
      // res.render('addSubcategory', {data:response});
      // res.status(200).json(docs);
    //    //  let result =docs[0].products.map(el=>el.productId,el=>el.quantity);
    // let data =docs[0].products.map(el=>el.quantity);
    // data.map(el=>{quantity = el.quantity})
    //  console.log('..',data)
    //  result.map(el=>{
    //   productId = el._id,
    //   productname =el.productname,
    //   productImage=el.productImage,
    //   price=el.price,
    //   productdescription=el.productdescription,
    //   quantity=el.quantity
    //  })