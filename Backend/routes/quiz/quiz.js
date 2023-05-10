const express = require("express");
const router = express.Router();
const quizController = require("../../controllers/quiz-management/quiz");

router.post("/addquiz", quizController.addQuiz);
router.get("/allquiz", quizController.getAllQuiz);
router.get("/:id", quizController.getQuizById);
router.put("/approvequiz/:id", quizController.approveQuiz);
router.put("/reportquiz/:id", quizController.reportQuiz);
router.put("/publishscore/:id", quizController.publishScore);

//'/quiz/:id/submit'
router.post("/:id/submit", quizController.submit);

router.delete("/delete/:id", quizController.deleteQuiz);

module.exports = router;
