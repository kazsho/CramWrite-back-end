const { Router } = require('express');
const teacherAuthenticator = require('../middleware/teacherAuthenticator.js')

const quizController = require('../controllers/quiz.js');
const Quiz = require('../models/quiz.js');

const quizRouter = Router();

quizRouter.get("/", quizController.index);
quizRouter.post("/", teacherAuthenticator, quizController.create);
quizRouter.get("/:id", quizController.show);
quizRouter.get("/subject/:id", quizController.showSubject);
quizRouter.get("/:id/question", quizController.showAllQuestions);
quizRouter.patch("/:id", teacherAuthenticator, quizController.update);
quizRouter.delete("/:id", teacherAuthenticator, quizController.destroy);


module.exports = quizRouter;