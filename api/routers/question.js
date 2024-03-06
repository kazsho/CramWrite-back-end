const { Router } = require('express');
const teacherAuthenticator = require('../middleware/teacherAuthenticator.js')

const questionController = require('../controllers/question.js');

const questionRouter = Router();

questionRouter.get("/", questionController.index);
questionRouter.post("/", teacherAuthenticator, questionController.create);
questionRouter.get("/:id", questionController.show);
questionRouter.get("/quiz/:id", questionController.showQuiz);
questionRouter.patch("/:id", teacherAuthenticator, questionController.update);
questionRouter.delete("/:id", teacherAuthenticator, questionController.destroy);


module.exports = questionRouter;