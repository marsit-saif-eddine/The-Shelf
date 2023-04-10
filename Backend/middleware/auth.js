const jwt = require('jsonwebtoken');
const User = require('../models/user');


// check json web token exists & is verified
const requireAuth = (req, res, next) => {

     const token = req.cookies.jwt;
    console.log("token: " + token)
   //const token = req.headers['jwt']

    if (token) {
        jwt.verify(token,process.env.JWT_SECRET, async (err, decodedToken) => {
            if (err) {
                res.status(400).send({"message": err.message});
            } else {
                let user = await User.findById(decodedToken.id);
                res.locals.user = user;
                req.user = user;
                next();
            }
        });
    } else {
        console.log('No token');
        res.status(400).send({"message": "not authorized"});
    }
};


module.exports = {requireAuth} ;