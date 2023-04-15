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
    quiz_status:{    type: String,
        
        enum: {
            values: ['approved','pending'],
            message: '{VALUE} is not supported'
          },
          default:"pending"
    },
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