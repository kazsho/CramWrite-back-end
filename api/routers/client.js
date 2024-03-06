const { Router } = require("express");

const authenticator = require('../middleware/authenticator.js');

const clientController = require("../controllers/client.js");
const Client = require("../models/Client.js");

const clientRouter = Router();

clientRouter.get("/", authenticator, clientController.index);
clientRouter.post("/register", clientController.register);
clientRouter.post("/login", clientController.login);
clientRouter.get("/:id", authenticator, clientController.show);
clientRouter.get("/:id/teacher", clientController.checkTeacher)
clientRouter.patch("/:id", authenticator, clientController.update);
clientRouter.delete("/:id", authenticator, clientController.destroy);
clientRouter.get("/token/:token", clientController.showToken);


module.exports = clientRouter;
