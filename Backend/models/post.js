const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const postSchema = new Schema(

    {

    content: {
        type: String,
        required: false,
    },

    date: { 
        type: Date,
        required: false
     },

    is_accepted: {
        type: Boolean,
        default: false
    },

    image: {
        type: String,
        required: false,
    },

    owner: {},
    owner_Id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },

    owner_pic:{
        type: String
    }


});

module.exports = mongoose.model("Post", postSchema);