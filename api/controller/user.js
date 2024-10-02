const express  =  require('express');
const router =  express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User  = require('../models/user');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.singUp= (req,res, next)=>{
    console.log(req.body)
    User.find({email: req.body.email})
    .exec()
    .then(user=>{
        if(user.length >= 1){
            return res.status(402).json({
                 message:'Mail Exists'
             })
        }
        else{
                bcrypt.hash(req.body.password,10,(err,hash)=>{
                if(err){
                    return res.status(500).json({
                        error:err
                    })
                }
                else{
                    const user = new User({
                        email :req.body.email,
                        password: hash,
                        firstName:req.body.firstName,
                        lastName:req.body.lastName,
                        mobileNo:req.body.mobileNo,
                        Address:req.body.Address
                    });
                    user.save().then(result=>{
                        console.log(result);
                        res.status(200).json({
                            message:'User Crea`ted',
                        
                            
                        })
                    }).catch(err=>console.log(err));
                }
            })
        }
    })
}
exports.login = async (req, res, next) => {
  console.log('User', req.body);
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      console.log('User found:', user);
      if (user.length < 1) {
        return res.status(404).json({
          message: 'Mail not found'
        });
      } else {
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
          console.log('result', result);
          if (err) {
            return res.status(401).json({
              message: 'Password Wrong'
            });
          }
          if (result) {
            console.log('result', result);
            const token = jwt.sign(
              {
                email: user[0].email,
                userId: user[0]._id
              },
              process.env.JWT_Token || 'yourFallbackSecretKey',
              {
                expiresIn: '1h'
              }
            );

            // return res.status(200).json({
            //   message: 'Auth Successfully',
            //   token: token,
            //   userId: user[0]._id,
            //   email: user[0].email,
            //   firstName: user[0].firstName,
            //   lastName: user[0].lastName,
            //   Address: user[0].Address,
            //   mobileNo: user[0].mobileNo
            // });
              User.findByIdAndUpdate(user[0]._id, { token: token }, { new: true })
              .then(updatedUser => {
                return res.status(200).json({
                  message: 'Auth Successfully',
                  token: token,
                  userId: updatedUser._id,
                  email: updatedUser.email,
                  firstName: updatedUser.firstName,
                  lastName: updatedUser.lastName,
                  Address: updatedUser.Address,
                  mobileNo: updatedUser.mobileNo
                });
              })
          } else {
            return res.status(401).json({
              message: 'Auth fails'
            });
          }
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

exports.getUser =async (req,res,next)=>{
    try {
        let _id = req.params.userId;
        console.log('userid',_id)
        const getUser = await User.findById(_id);
        res.send(getUser);
    } catch (error) {
        // res.send(error);
    }
  }
exports.deleteaccount = (req,res,next)=>{
    User.remove({_id:req.params.id})
    .exec()
    .then( res=>{
              res.status(200).json({
                  message:"User Delete"
              })
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            error:err
        })
    });
  }

  // exports.add_address = async (req, res, next) => {
  //   console.log(req.body);
  
  //   const userId = mongoose.Types.ObjectId(req.params.userId);
  //   const newAddress = req.body.Address;
  
  //   try {
  //     const result = await User.findByIdAndUpdate(
  //       userId,
  //       { $push: { Address: newAddress } },
  //       { new: true } // This option returns the modified document
  //     ).exec();
  
  //     if (result) {
  //       res.status(200).json({
  //         Address: result.Address,
  //         request: {
  //           type: "PATCH",
  //           url: `http://localhost:3000/${userId}`
  //         }
  //       });
  //     } else {
  //       res.status(404).json({ message: 'User not found' });
  //     }
  //   } catch (err) {
  //     console.log(err);
  //     res.status(500).json({
  //       error: err
  //     });
  //   }
  // }
exports.add_address = async (req, res, next) => {
    console.log(req.body);
  
    const userId = mongoose.Types.ObjectId(req.params.userId);
    const newAddress = req.body.Address;
  
    try {
      // Fetch the current user document
      const user = await User.findById(userId).exec();
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Check if the address type already exists
      const addressTypeExists = user.Address.some(
        address => address.addresstype === newAddress.addresstype
      );
  
      if (addressTypeExists) {
        return res.status(400).json({ message: `An address of type ${newAddress.addresstype} already exists` });
      }
  
      // Add the new address if no conflict
      const result = await User.findByIdAndUpdate(
        userId,
        { $push: { Address: newAddress } },
        { new: true } // This option returns the modified document
      ).exec();
  
      res.status(200).json({
        Address: result.Address,
        request: {
          type: "PATCH",
          url: `http://localhost:3000/${userId}`
        }
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        error: err
      });
    }
  };
  
  exports.resetpassword =async (req,res)=>{
    try {
    console.log(req.body)
     email  = req.body.email;
     password = req.body.password;
     console.log("email", req.body.email);
   
   //Find the user by email
   const user = await User.findOne({ email });
   if (!user) {
     return res.status(404).send('User not found');
   }
   // Update the user's password
   // Hash the password
   const hash = await bcrypt.hash(password, 10);
   user.password = hash;
   // Clear any existing reset token fields (optional if not using tokens)
   user.resetPasswordToken = undefined;
   user.resetPasswordExpires = undefined;
   
  await user.save();
 
   res.status(200).json({
    message: "Your Password has been change please try login."
  });

    }
    catch (err) {
     console.error('Error:', err);
     return res.status(500).send('Internal Server Error');
   }
   
 }

 exports.logout = async (req, res, next) => {
  const userId = req.body.userId; // Ensure userData exists before accessing userId
  console.log('logoutuser',userId)
  if (!userId) {
    return res.status(400).json({
      message: 'User ID not found',
    });
  }
  
  console.log('User ID:', userId);
  
  try {
    await User.findByIdAndUpdate(userId, { token: null });  // Set token to null
    res.status(200).json({
      message: 'Logout successful',
    });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({
      message: 'Logout failed',
      error: error.message || error,  // More detailed error message
    });
  }
};


