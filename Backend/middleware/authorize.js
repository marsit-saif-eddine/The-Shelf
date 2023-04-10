const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.authorize = (roles) => {
    return async (req, res, next) => {
      const token = req.cookies.jwt;
  
      if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
      }
  
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.sub);
  
        if (!user || !roles.includes(user.role)) {
          return res.status(401).json({ message: "Unauthorized" });
        }
  
        req.user = user;
        next();
      } catch (err) {
        return res.status(401).json({ message: "Unauthorized" });
      }
    };
  };