const { Router } = require('express');

const questionController = require('../controllers/question.js');

const questionRouter = Router();

questionRouter.get("/", questionController.index);
questionRouter.post("/", questionController.create);
questionRouter.get("/:id", questionController.show);
questionRouter.get("/quiz/:id", questionController.showQuiz);
questionRouter.patch("/:id", questionController.update);
questionRouter.delete("/:id", questionController.destroy);


module.exports = questionRouter;