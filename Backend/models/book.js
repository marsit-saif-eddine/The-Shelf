const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bookSchema = new Schema(

    {

    name: {
        type: String,
        required: true,
    },

    author: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: false,
    },

    price: {
        type: Number,
        required: false,
    },

    available: {
        type: Boolean,
    },

    accepted: {
        type: Boolean,
        default: false
    },

    image: {
        type: String,
        required: false,
    },

    state: {
            type: String,
            required: false,
    },

    for_sale: {
        type: Boolean,
        default: false
    },

    genre: {
        type: [String],
        required: false
    },

    owner: {},
    owner_Id: {},
   

});

module.exports = mongoose.model("Book", bookSchema);