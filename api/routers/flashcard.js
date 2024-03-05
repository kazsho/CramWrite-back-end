const { Router } = require('express');

const flashcardController = require('../controllers/flashcard.js');

const flashcardRouter = Router();

flashcardRouter.get("/", flashcardController.index);
flashcardRouter.post("/", flashcardController.create);
flashcardRouter.get("/:id", flashcardController.show);
flashcardRouter.patch("/:id", flashcardController.update);
flashcardRouter.get("/learn_set/:id", flashcardController.showSet);

module.exports = flashcardRouter;