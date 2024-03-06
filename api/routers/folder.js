const { Router } = require('express');

const folderController = require('../controllers/folder.js');
const Folder = require('../models/folder.js');

const folderRouter = Router();

folderRouter.get("/", folderController.index);
folderRouter.post("/", folderController.create);
folderRouter.get("/:id", folderController.show);
folderRouter.get("/:id/set", folderController.showAllSets);
folderRouter.patch("/:id", folderController.update);
folderRouter.delete("/:id", folderController.destroy);



module.exports = folderRouter;