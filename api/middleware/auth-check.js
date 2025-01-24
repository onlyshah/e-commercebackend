// const jwt = require('jsonwebtoken');
// const User = require('../models/user'); // Import your User model

// module.exports = (req, res, next) => {
//   try {
//     const token = req.headers.authorization.split(" ")[1]; // Extract token from Authorization header
//     if (!token) {
//       return res.status(401).json({ message: 'Auth failed: Token missing' });
//     }

//     // Verify the token
//     const decodedToken = jwt.verify(token, process.env.JWT_Token || 'yourFallbackSecretKey');
//     req.userData = { userId: decodedToken.userId, email: decodedToken.email };

//     // Check if the token exists in the user's record
//     User.findById(req.userData.userId).then(user => {
//       if (!user || user.token !== token) {
//         return res.status(401).json({
//           message: 'Auth failed: Invalid token'
//         });
//       }
//       next(); // Token is valid, proceed to next middleware or route handler
//     }).catch(err => {
//       return res.status(401).json({
//         message: 'Auth failed',
//         error: err
//       });
//     });

//   } catch (error) {
//     return res.status(401).json({
//       message: 'Auth failed: Invalid or expired token'
//     });
//   }
// };
const jwt = require('jsonwebtoken');
const User = require('../models/user'); // Import your User model

module.exports = async (req, res, next) => {
  try {
    // Extract token from the Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: 'Auth failed: Token missing' });
    }
    const token = authHeader.split(" ")[1];

    // Verify the token
    let decodedToken;
    try {
      decodedToken = jwt.verify(token, process.env.JWT_Token || 'yourFallbackSecretKey');
    } catch (error) {
      return res.status(401).json({ message: 'Auth failed: Invalid or expired token' });
    }

    // Check if the user exists and the token matches the one in the database
    const user = await User.findById(decodedToken.userId);
    if (!user || user.token !== token) {
      return res.status(401).json({ message: 'Auth failed: Invalid token' });
    }

    // Attach user data to the request object
    req.userData = { userId: user._id, email: user.email };

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    return res.status(500).json({
      message: 'Auth failed: An error occurred',
      error: error.message,
    });
  }
};

