const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const InteractionSchema = new Schema(

    {

    user_id: {
        type: String,
        required: true,
    },

    book_id: {
        type: String,
        required: true,
    },
    rating: {
        type: String,
        required: true,
    },


});

module.exports = mongoose.model("liked_books_full", InteractionSchema);