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


  exports.getAllQuiz = async (req, res, next) => {
    let quizs;
    try {
      quizs = await Quiz.find();
    } catch (err) {
      console.log(err);
    }
  
    if (!quizs) {
      return res.status(404).json({ message: "No quiz found" });
    }
    return res.status(200).json({ quizs });
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

  