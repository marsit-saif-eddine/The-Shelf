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
    creator:{},
    creator_pic:{  type: String,},

    quiz_status:{    type: String,
        
        enum: {
            values: ['approved','pending'],
            message: '{VALUE} is not supported'
          },
          default:"pending"
    },


    reported:{
        type: Number,
        default:0,

    },

    publicScore :{  type:String,
    enum: {
    values: ['public','notPublished'],
    message: '{VALUE} is not supported'
  },
  default:"notPublished"

    },
    
    questions :[
        {
        questionText: {
        type: String,
        
    },
    questionType: {
        type: String,
        
    },

    options: [{
        optionText: String,
      }],
      
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
 
    
}],
submissions: [
    {
      answers: [],
      score: Number,
      taker_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    },
  ],

});

module.exports = mongoose.model("Quiz", quizSchema);