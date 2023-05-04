const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const goodreadSchema = new Schema(

    {

    book_id: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    ratings: {
        type: Number,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    cover_image: {
        type: String,
        required: true,
    },
    mod_title: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("goodread", goodreadSchema);