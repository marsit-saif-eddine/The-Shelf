const User = require("../models/user.js");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
const { validationResult } = require('express-validator');
var mongoose = require('mongoose');


//token_age
const maxAge = 3 * 24 * 60 * 60;

//create token
const  createToken = (user) => {

    return jwt.sign({...user}, 'jwt', { expiresIn: '7d' });
};


const createRefreshToken = (user) => {
    const refreshToken = jwt.sign({...user}, 'jwt', { expiresIn: '7d' });
    return refreshToken;
  }

exports.refreshToken= (req, res) => {
    const accessToken = req.body.accessToken;
  
    if (!accessToken) {
      return res.status(401).json({ message: 'access token is required' });
    }
  
    try {
      const decoded = jwt.verify(accessToken, 'jwt');
      const userId = decoded._id;
  
      const newToken = createRefreshToken(userId);
  
      res.json(newToken);
    } catch (err) {
      return res.status(403).json({ message: 'Invalid access token' });
    }
  }  
exports.rateUser = async (req, res) => {
    try {

        // req.user = {
        //     user_id: '640720cc768d6ab308f5f72b'
        // }
        const rating = {
            user_id: req.body.profileId,
            value: req.body.value
        }

        const updatedUser = await User.updateOne(
            {
                _id: new mongoose.Types.ObjectId(req.body.profileId),
                "rating.user_id": rating.user_id
            },
            {
                $set: { "rating.$[element]": rating },
            },
            { arrayFilters: [{ "element.user_id": rating.user_id }] },
            {
                new: true


            });

        console.log(updatedUser)


        if (updatedUser.matchedCount == 0) {
            await User.updateOne(
                {
                    _id: new mongoose.Types.ObjectId(req.body.profileId)
                },
                {
                    $push: { rating: rating }
                });
        }
        res.status(200).send(true);
    } catch (err) {
        console.log(err.message)
        res.status(500).send(err.code);
    }
}



exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email }, 'lastname firstname photo role password ability');
        if (user) {
            if (user.isConfirmed === false) {return res.status(409).json({ "message": "please check your email to confirm you account !" });}
            if (user.status === 'banned') {
                return res.status(400).json({ "message": "User is banned!!" });
            } else {
                const auth = await bcrypt.compare(password, user.password);

                if (auth) {
                    user._id = user._id.toString();
                    delete user.password;
                    const accessToken = createToken(user);
                    const refreshToken = createRefreshToken(user);
                    res.cookie('jwt', accessToken, { httpOnly: true, maxAge: maxAge * 1000 });
                    
                    return res.status(200).json({
                        userData: user,
                        accessToken: accessToken,
                        refreshToken: refreshToken
                    });
                } else {
                    return res.status(400).json({ "message": "Incorrect password" })
                }
            }
        } else {
            return res.status(404).json({ "message": "No user found" })
        }

    } catch (err) {
        res.status(400).json({ "message": err.message })
    }
}


//logout
exports.logout = async (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    //res.header('jwt', '')
    res.status(200).send({ "message": "logged out" });
}


exports.getAllUsersForAdmin = async (req, res, next) => {
    try {
        const users = await User.find({});
        let profiles = [];
        users.map(user => {
            let profile = {
                ...user
            }
            profile = {
                ...profile['_doc'],
                rate: 0
            };
            profile.rate = profile.rating.reduce((a, b) => a + b.value, 0);
            profile.rate = profile.rate / profile.rating.length;
            delete profile.rating;

            profiles.push(profile);
        });
        res.status(200).send(profiles);
        
    } catch (err) {
        res.status(400).json({ "message": err.message })
    }
};

exports.getUsersForAdmin = async (req, res) => {
    try {
      // Extract the query parameters from the request
      const { q, sortColumn, sort, page, perPage, role, status } = req.query;

      // Create the filter object based on the query parameters
      const filter = {};
      if (q) {
        filter.$or = [  
            { firstname: new RegExp(q, 'i') },    
            { lastname: new RegExp(q, 'i') },  
            { email: new RegExp(q, 'i') },   
        ];
      }
      if (role) {
        filter.role = role;
      }
      if (status) {
        filter.status = status;
      }
  
      // Set the sort order based on the query parameters
      const sortOrder = {};
      if (sortColumn) {
        sortOrder[sortColumn] = sort === 'desc' ? -1 : 1;
      }
  
      // Query the database for matching users and calculate pagination variables
      const totalUsers = await User.countDocuments(filter);
      const totalPages = Math.ceil(totalUsers / perPage);
      const users = await User.find(filter)
        .sort(sortOrder)
        .skip((page - 1) * perPage)
        .limit(perPage);

        let profiles = [];
        users.map(user => {
            let profile = {
                ...user
            }
            profile = {
                ...profile['_doc'],
                rate: 0
            };
            profile.rate = profile.rating.reduce((a, b) => a + b.value, 0);
            profile.rate = profile.rate / profile.rating.length;
            delete profile.rating;

            profiles.push(profile);
        });
  
      // Return the response as a JSON object
      res.json({ users: profiles, total:totalUsers , perPage });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  }


exports.getUsers = async (req, res, next) => {
    try {
        const { fav_genre, fav_author } = req.query;

        let filter = {};

        if (fav_genre) {
            filter.fav_genre = { $in: fav_genre.split(",") };
        }

        if (fav_author) {
            filter.fav_author = { $in: fav_author.split(",") };
        }

        filter.status='active'
        let users = await User.find(filter);
        let profiles = [];
        users.map(user => {
            let profile = {
                ...user
            }
            profile = {
                ...profile['_doc'],
                rate: 0
            };
            profile.rate = profile.rating.reduce((a, b) => a + b.value, 0);
            profile.rate = profile.rate / profile.rating.length;
            delete profile.rating;

            profiles.push(profile);
        });
        console.log(profiles);
        res.status(200).send(profiles);
    } catch (err) {
        res.status(400).json({ "message": err.message });
    }
};

exports.getUserProfile = async (req, res, next) => {
    try {
        const { userId } = req.query;
        console.log(userId)

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // let profile = {
        //     ...user
        // }
        // profile = {
        //     ...profile['_doc'],
        //     rate: 0
        // };
        // const { rating, ...profile } = user.toJSON();
        // const sum = rating.length ? rating.reduce((a, b) => a + b.rate, 0): 0;
        // profile.rate = rating.length ? sum / rating.length : 0;
        // delete profile.rating;

       
            let profile = {
                ...user
            }
            profile = {
                ...profile['_doc'],
                rate: 0
            };
            profile.rate = profile.rating.reduce((a, b) => a + b.value, 0);
            profile.rate = profile.rate / profile.rating.length;
            delete profile.rating;

        
        console.log(profile)
        res.status(200).json(profile);
    } catch (err) {
        return res.status(400).json({ "message": err.message })
    }
}


exports.updateProfile = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { userId } = req.params;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }
        if (user.status === 'banned') {
            return res.status(400).json({ error: "User is banned !" });
        }


            user.firstname = req.body.firstname,
            user.lastname = req.body.lastname,
            user.email = req.body.email,
            user.phone_number = req.body.phone_number,
            user.address = req.body.address,
            user.fav_genre = req.body.fav_genre,
            user.fav_author = req.body.fav_author,
            await user.save();

        return res.status(200).json({ user });
    } catch (error) {
        return res.status(400).json({ "message": error.message })
    }

}





//ban user

exports.banUser = async (req, res) => {
    const userId = req.query.id;
    try {
        const user = await User.findById(userId);
        if (user) {
            user.status = "banned";
            user.save();
            res.status(200).json({ "message": "User banned" });
        } else {
            res.status(404).json({ "message": "User not found" });
        }
    } catch (err) {
        res.status(400).json({ "message": err.message })
    }
}



//Unban user
exports.unbanUser = async (req, res) => {
    const userId = req.query.id;
    try {
        const user = await User.findById(userId);
        if (user) {
            user.status= "active";
            user.save();
            res.status(200).json({ "message": "User unbanned" });
        } else {
            res.status(404).json({ "message": "User not found" });
        }
    } catch (err) {
        res.status(400).json({ "message": err.message })
    }
}


//  disactivate a user
exports.disactivateUser = async (req, res) => {
    const userId = req.query.id;
    try {
        const user = await User.findById(userId);
        if (user) {
            user.status = "inactive";
            user.save();
            res.status(200).json({ "message": "User disactivated" });
        } else {
            res.status(404).json({ "message": "User not found" });
        }
    } catch (err) {
        res.status(400).json({ "message": err.message })
    }
}


// reactivate a user

exports.activateUser = async (req, res) => {
    const userId = req.query.id;
    try {
        const user = await User.findById(userId);
        if (user) {
            user.status = "active";
            user.save();
            res.status(200).json({ "message": "User is active again" });
        } else {
            res.status(404).json({ "message": "User not found" });
        }
    } catch (err) {
        res.status(400).json({ "message": err.message })
    }
}

