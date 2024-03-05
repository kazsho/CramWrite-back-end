const { Router } = require("express");

const clientController = require("../controllers/client.js");
const Client = require("../models/Client.js");

const clientRouter = Router();

clientRouter.get("/", clientController.index);
clientRouter.post("/", clientController.create);
clientRouter.get("/:id", clientController.show);
clientRouter.patch("/:id", clientController.update);
clientRouter.delete("/:id", clientController.destroy);


module.exports = clientRouter;
