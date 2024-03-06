const { Router } = require('express');

const quizController = require('../controllers/quiz.js');
const Quiz = require('../models/quiz.js');

const quizRouter = Router();

quizRouter.get("/", quizController.index);
quizRouter.post("/", quizController.create);
quizRouter.get("/:id", quizController.show);
quizRouter.get("/subject/:id", quizController.showSubject);
quizRouter.patch("/:id", quizController.update);
quizRouter.delete("/:id", quizController.destroy);



module.exports = quizRouter;