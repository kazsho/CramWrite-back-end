const { Router } = require('express');

const subjectController = require('../controllers/subject.js');
const Subject = require('../models/subject.js');

const subjectRouter = Router();

subjectRouter.get("/", subjectController.index);
subjectRouter.post("/", subjectController.create);
subjectRouter.get("/:id", subjectController.show);
subjectRouter.get("/client/:id", subjectController.showClient);
subjectRouter.get("/:id/set", subjectController.showAllSets);
subjectRouter.get("/:id/quiz", subjectController.showAllQuiz);
subjectRouter.patch("/:id", subjectController.update);
subjectRouter.delete("/:id", subjectController.destroy);



module.exports = subjectRouter;