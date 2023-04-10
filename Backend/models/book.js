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

    image: {
        type: String,
        required: false,
    },

    state: {
            type: String,
            required: false,
    },

    place: {
            type: String,
            required: false,
    },

});

module.exports = mongoose.model("Book", bookSchema);