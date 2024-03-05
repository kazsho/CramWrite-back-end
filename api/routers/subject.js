const { Router } = require('express');

const subjectController = require('../controllers/subject.js');
const Subject = require('../models/subject.js');

const subjectRouter = Router();

subjectRouter.get("/", subjectController.index);
subjectRouter.post("/", subjectController.create);
subjectRouter.get("/:id", subjectController.show);
subjectRouter.get("/client/:id", subjectController.showClient);
subjectRouter.patch("/:id", subjectController.update);
subjectRouter.delete("/:id", subjectController.destroy);



module.exports = subjectRouter;