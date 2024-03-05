const { Router } = require('express');

const flashcardController = require('../controllers/flashcard.js');

const flashcardRouter = Router();

flashcardRouter.get("/", flashcardController.index);
flashcardRouter.get("/:id", flashcardController.show);

module.exports = flashcardRouter;