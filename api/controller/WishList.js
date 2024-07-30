const WishList = require("../models/WishList");
const mongoose = require("mongoose");
exports.addtoWishlist = async (req, res) => {
  console.log(req.body);

  let userId = req.body.userId;
  let proId = req.body.List.productId;

  console.log(proId, 'userId', userId);

  try {
    let List = await WishList.findOne({ userId });
    console.log("List", List);

    if (List) {
      let itemIndex = List.List.findIndex(p => p.productId == proId);
      console.log("index", itemIndex);

      if (itemIndex > -1) {
        return res.status(400).json({
          message: 'Product is already present in Wishlist'
        });
      } else {
        List.List.push({ productId: proId });
        await List.save();
        return res.status(200).json({
          message: 'Product added to Wishlist'
        });
      }
    } else {
      const newList = new WishList({
        _id: new mongoose.Types.ObjectId(),
        userId: req.body.userId,
        List: [{ productId: proId }]
      });

      await newList.save();
      return res.status(201).json({
        message: 'Wishlist created and product added'
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: 'Server error'
    });
  }
};

exports.getwishList = async (req ,res ) =>{
  let userId = req.params.userId;
  console.log('userId', userId);

  try {
    const docs = await  WishList.find({ 'userId': userId })
      .populate('List.productId')
      .exec();
    if (!docs || docs.length === 0) {
      return res.status(404).json({
        message: 'No cart found for this user'
      });
    }
    const List = docs[0].List;
    const ListCount = List.length;
    console.log('ListCount', ListCount);
    res.send({
    List: List,
    ListCount: ListCount
    });
  }catch (err) {
    console.log(err);
    res.status(500).json({
      error: err
    });
  }

  }

exports.deletewishlist = (req, res, next) => {
  console.log(req)
  const userId = req.params.userId;
  const productId = req.params.productId;
  console.log('productId',productId)

  // Ensure productId is provided in the request body
  if (!productId) {
      return res.status(400).json({ message: 'Product Id is required' });
  }

  WishList.findOneAndUpdate(
      { userId: userId },
      { $pull: { List: { productId: productId } } },
      { new: true } // To return the updated document
  )
  .exec()
  .then(updatedWishlist => {
      if (updatedWishlist) {
          res.status(200).json({
              message: 'Product removed successfully',
              request: {
                  type: 'DELETE',
                  description: 'Delete product from wishlist',
                  url: `http://localhost:3000/wishlist/deletewishlist/${userId}`,
                  body: { productId: productId }
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

