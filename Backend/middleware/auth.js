const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { getDb } = require("../services/database/connection");
const ObjectID = require('mongodb').ObjectId;


// check json web token exists & is verified
const requireAuth = (req, res, next) => {

    let token = req.header('Authorization').split(' ')[1];
    token = token.replace(`"`, "");
    token = token.replace(`"`, "");
    console.log(token);

    if (token) {
        jwt.verify(token,process.env.JWT_SECRET, async (err, decodedToken) => {
            if (err) {
                res.status(400).send({"message": err.message});
            } else {
                res.locals.user = decodedToken;
                req.user = decodedToken;
                next();
            }
        });
    } else {
        console.log('No token');
        res.status(400).send({"message": "not authorized"});
    }
};


module.exports = {requireAuth} ;