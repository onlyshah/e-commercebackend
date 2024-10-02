const express  =  require('express');
const router =  express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User  = require('../models/user');
const jwt = require('jsonwebtoken');
const userController = require('../controller/user');
router.post('/signup' , userController.singUp);
router.post('/login' , userController.login);
router.delete("/:userId", userController.deleteaccount);
router.post("/addUseraddress/:userId", userController.add_address);
/**  temporary comment for this error
 * const castError = new CastError();
                    ^

CastError: Cast to ObjectId failed for value "addCategory" (type string) at path "_id" for model "User" */
router.get("/getuser/:userId", userController.getUser);
router.post("/resetpassword", userController.resetpassword);

router.post("/logout", userController.logout);
module.exports = router;