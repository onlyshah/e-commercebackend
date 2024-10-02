const jwt = require('jsonwebtoken');
const User = require('../models/user'); // Import your User model

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; // Extract token from Authorization header
    if (!token) {
      return res.status(401).json({ message: 'Auth failed: Token missing' });
    }

    // Verify the token
    const decodedToken = jwt.verify(token, process.env.JWT_Token || 'yourFallbackSecretKey');
    req.userData = { userId: decodedToken.userId, email: decodedToken.email };

    // Check if the token exists in the user's record
    User.findById(req.userData.userId).then(user => {
      if (!user || user.token !== token) {
        return res.status(401).json({
          message: 'Auth failed: Invalid token'
        });
      }
      next(); // Token is valid, proceed to next middleware or route handler
    }).catch(err => {
      return res.status(401).json({
        message: 'Auth failed',
        error: err
      });
    });

  } catch (error) {
    return res.status(401).json({
      message: 'Auth failed: Invalid or expired token'
    });
  }
};
