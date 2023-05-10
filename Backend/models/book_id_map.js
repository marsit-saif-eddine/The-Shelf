const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bookIdMapSchema = new Schema(

    {

    book_id_csv: {
        type: String,
        required: true,
    },

    book_id: {
        type: String,
        required: true,
    },


});

module.exports = mongoose.model("book_id_map", bookIdMapSchema);