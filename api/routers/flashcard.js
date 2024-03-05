const { Router } = require('express');

const flashcardController = require('../controllers/flashcard.js');
const Flashcard = require('../models/flashcard.js');

const flashcardRouter = Router();

flashcardRouter.get("/", flashcardController.index);
flashcardRouter.post("/", flashcardController.create);
flashcardRouter.get("/:id", flashcardController.show);
flashcardRouter.get("/client/:id", flashcardController.showClient);
flashcardRouter.get("/subject/:id", flashcardController.showSubject);
flashcardRouter.patch("/:id", flashcardController.update);
flashcardRouter.delete("/:id", flashcardController.destroy);
flashcardRouter.get("/learn_set/:id", flashcardController.showSet);


module.exports = flashcardRouter;