const Quiz = require("../../models/quiz.js");
const http = require("http");
const { getSocketNotif } = require("../../serverNotif.js");
const server = http.createServer();

//const socketio = require ("../../serverNotif.js")

exports.addQuiz = async (req, res, next) => {
  try {
    const quizData = req.body;

    // Validate quiz data here

    const newQuiz = new Quiz(quizData);
    await newQuiz.save();
    res.status(201).json(newQuiz);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
};

exports.getAllQuiz = async (req, res) => {
  try {
    const { userconnected } = req.query;
    const { book } = req.query;
    const { status } = req.query;
    const { score } = req.query;
    const { taker } = req.query;
    const filter = {};

    if (userconnected) {
      filter.user_id = userconnected;
    }
    if (book) {
      filter.book_id = book;
    }
    if (status) {
      filter.quiz_status = status;
    }

    if (score) {
      filter.publicScore = score;
    }
    if (taker) {
      filter.submissions.taker_id = taker;
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
    const quiz = await Quiz.findById(id);
    if (quiz) {
      quiz.deleteOne();
      res.status(200).json({ message: "quiz deleted" });
    } else {
      res.status(404).json({ message: "quiz not found" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.approveQuiz = async (req, res, next) => {
  const quizId = req.params.id;
  try {
    const quiz = await Quiz.findById(quizId);
    if (quiz) {
      quiz.quiz_status = "approved";
      quiz.save();

      res.status(200).json({ message: "quiz approved" });
    } else {
      res.status(404).json({ message: "quiz not found" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.saveAnswers = async (req, res, next) => {
  try {
    const quizAnswers = req.body;

    // Validate quiz data here

    const newQuiz = new Quiz(quizAnswers);
    await newQuiz.save();
    res.status(201).json(newQuiz);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
};
exports.reportQuiz = async (req, res, next) => {
  const quizId = req.params.id;
  try {
    const quiz = await Quiz.findById(quizId);
    if (quiz) {
      quiz.reported = quiz.reported + 1;
      quiz.save();
      res.status(200).json({ message: "quiz reported" });
    } else {
      res.status(404).json({ message: "quiz not found" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
exports.submit = async (req, res) => {
  const { id } = req.params;
  const { answers, taker_id } = req.body;
  //const {taker_id}= req.session.user.id;
  try {
    // Fetch the quiz from the database using the ID
    const quiz = await Quiz.findById(id);

    // Calculate the user's score by comparing their answers to the correct answers
    let score = 0;

    for (let i = 0; i < quiz.questions.length; i++) {
      const question = quiz.questions[i];
      const userAnswer = answers[i];
      console.log("g :" + question.answerkey);
      console.log("u :" + userAnswer);
      console.log("ans: " + id);
      if (userAnswer === question.answerkey) {
        console.log("score 3");

        score += question.points;
        console.log("score saved");
      }
    }

    // Update the quiz in the database to record the user's score
    quiz.submissions.push({ answers, score, taker_id });
    await quiz.save();
    console.log("sub saved");
    // Send the user's score back to the frontend as a response
    res.json({ score });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.publishScore = async (req, res, next) => {
  const quizId = req.params.id;
  try {
    const quiz = await Quiz.findById(quizId);
    if (quiz) {
      quiz.publicScore = "public";
      quiz.save();
      res.status(200).json({ message: "score published" });
    } else {
      res.status(404).json({ message: "quiz not found" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
