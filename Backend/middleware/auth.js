const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { getDb } = require("../services/database/connection");
const ObjectID = require('mongodb').ObjectId;


// check json web token exists & is verified
const requireAuth = (req, res, next) => {

    let token = req.header('Authorization').split(' ')[1];
    token = token.replace(`"`, "");
    token = token.replace(`"`, "");
   //const token = req.headers['jwt']
   console.log(token);

    if (token) {
        console.log(token);
        jwt.verify(token,process.env.JWT_SECRET, async (err, decodedToken) => {
            if (err) {
                console.log(err);
                res.status(400).send({"message": err.message});
            } else {
                console.log('token')
                let user = await getDb().collection('users').findOne({_id: new ObjectID(decodedToken._id)}, {projection: {lastname: 1, firstname: 1, photo: 1}});
                user._id = user._id.toString();
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