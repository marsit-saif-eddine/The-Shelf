var User = require('../models/user.js')
var mongoose = require('mongoose');


const save = (req, res, next) => {
    ({
        firstname, lastname, email, phonenumber, state, address, password,
        role, favoritegenre, favoriteauthor, profilepicture, rating
    } = req.body)
    newUser = new User({
        firstname, lastname, email, phonenumber, state, address, password,
        role, favoritegenre, favoriteauthor, profilepicture, rating
    })

    User.create(newUser).then(userr => {
        res.status(201).json(userr)

    }).catch((err) => {
        console.log(err);
        return res
            .status(400)
            .json({ msg: "Error : something wrong while adding  user" });
    });

}

const patchRating = async (email, rating) => {
    let updatedUser = await User.findOneAndUpdate({
        email
    }, { "rating": rating }, { new: true })
    return updatedUser

}

const rateUser = async (profileId, rating) => {
    const updatedUser = await User.updateOne(
        {
            _id: mongoose.Types.ObjectId(profileId)
        },
        {
            $set: { rating },
        },
        {
            upsert: true,
            runValidators: true
        });
    return updatedUser;
}


//ban user

const banUser = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await User.findById(userId);
        if (user) {
            user.is_banned = true;
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
const unbanUser = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await User.findById(userId);
        if (user) {
            user.is_banned = false;
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
const disactivateUser = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await User.findById(userId);
        if (user) {
            user.is_active = false;
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

const activateUser = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await User.findById(userId);
        if (user) {
            user.is_active = true;
            user.save();
            res.status(200).json({ "message": "User is active again" });
        } else {
            res.status(404).json({ "message": "User not found" });
        }
    } catch (err) {
        res.status(400).json({ "message": err.message })
    }
}



module.exports = { save, patchrating: patchRating, banUser, unbanUser, disactivateUser, activateUser, rateUser }

