const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const likedBookSchema = new Schema(

    {

    book_id: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    rating: {
        type: String,
        required: true,
    },
    user_id: {
        type: String,
        required: true,
    },
  
});

module.exports = mongoose.model("liked_books_fulls", likedBookSchema);