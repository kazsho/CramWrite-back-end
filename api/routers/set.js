const { Router } = require('express');

const setController = require('../controllers/set.js');

const setRouter = Router();

setRouter.get("/", setController.index);
setRouter.post("/", setController.create);
setRouter.get("/:id", setController.show);
setRouter.get("/folder/:id", setController.showFolder);
setRouter.get("/:id/flashcard", setController.showAllFlashcards)
setRouter.patch("/:id", setController.update);
setRouter.delete("/:id", setController.destroy);


module.exports = setRouter;