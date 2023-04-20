const Quiz = require("../../models/quiz.js")


exports.addQuiz = async (req, res, next) => {
  
    try {
    const quizData = req.body;

    // Validate quiz data here

    const newQuiz = new Quiz(quizData);
    await newQuiz.save();
    res.status(201).json(newQuiz);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }

  };


  // exports.getAllQuiz = async (req, res, next) => {
  //   let quizs;
  //   try {
  //     quizs = await Quiz.find();
  //   } catch (err) {
  //     console.log(err);
  //   }
  
  //   if (!quizs) {
  //     return res.status(404).json({ message: "No quiz found" });
  //   }
  //   return res.status(200).json({ quizs });

  // };

  exports.getAllQuiz = async (req, res) => {
    try {
      const {userconnected}=req.query
      const {book}=req.query
      const{status}=req.query
      const{report}=req.query
      const filter={}
      
      if(userconnected){
        filter.user_id=userconnected
      }
      if (book) {
        filter.book_id = book;
      }
      if (status) {
        filter.quiz_status = status;
      }
      if(report){
        filter.reported= report;
      }
      const quizzes = await Quiz.find(filter);
      res.json(quizzes);
    
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  


  exports.getQuizById = async (req, res, next) => {
    const id = req.params.id;
    let quiz;
    try {
      quiz = await Quiz.findById(id);
    } catch (err) {
      console.log(err);
    }
    if (!quiz) {
      return res.status(404).json({ message: "No quiz found" });
    }
    return res.status(200).json({ quiz });
  };
 
  exports.getQuizByBook = async (req, res, next) => {
    const id = req.params.id;
    let quiz;
    try {
      quiz = await Quiz.findById(id);
    } catch (err) {
      console.log(err);
    }
    if (!quiz) {
      return res.status(404).json({ message: "No quiz found" });
    }
    return res.status(200).json({ quiz });
  };
 

  exports.deleteQuiz = async (req, res, next) => {
    const id = req.params.id;
    let quiz;
    try {
      quiz = await Quiz.findByIdAndRemove(id);
    } catch (err) {
      console.log(err);
    }
    if (!quiz) {
      return res.status(404).json({ message: "Unable To Delete By this ID" });
    }
    return res.status(200).json({ message: "quiz Successfully Deleted" });
  };

  exports.approveQuiz=async(req,res,next)=>{
    const quizId = req.params.id;
    try {
        const quiz = await Quiz.findById(quizId);
        if (quiz) {
          quiz.quiz_status = "approved";
          quiz.save();
            res.status(200).json({ "message": "quiz approved" });
        } else {
            res.status(404).json({ "message": "quiz not found" });
        }
    } catch (err) {
        res.status(400).json({ "message": err.message })
    }
  };

exports.saveAnswers=async(req,res,next)=>{
  
  try {
    const quizAnswers = req.body;

    // Validate quiz data here

    const newQuiz = new Quiz(quizAnswers);
    await newQuiz.save();
    res.status(201).json(newQuiz);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
}
    exports.reportQuiz=async(req,res,next)=>{
      const quizId = req.params.id;
      try {
          const quiz = await Quiz.findById(quizId);
          if (quiz) {
            quiz.reported = quiz.reported +1;
            quiz.save();
              res.status(200).json({ "message": "quiz reported" });
          } else {
              res.status(404).json({ "message": "quiz not found" });
          }
      } catch (err) {
          res.status(400).json({ "message": err.message })
      }

  }