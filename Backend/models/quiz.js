const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const quizSchema = new Schema(

    {
    quizName:{
    type: String
    },
    quizDescription : {
    type:String
    },
book_id:{},
user_id:{},
    questions :[
        {
        questionText: {
        type: String,
        
    },
    questionType: {
        type: String,
        
    },

    options: {
        type: [],
        required: false,
    },

    answer: {
        type: Boolean,
        required: false,
    },

    answerkey: {
        type: String,
    },

    points: {
        type: Number,
        required: false,
    }
    
}]

});

module.exports = mongoose.model("Quiz", quizSchema);