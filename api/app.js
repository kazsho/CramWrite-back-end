const express = require('express');
const cors = require('cors');
const logger = require('./middleware/logger.js');

const flashcardRouter = require('./routers/flashcard');
const clientRouter = require('./routers/client');
const folderRouter = require('./routers/folder');
const subjectRouter = require('./routers/subject');
const setRouter = require('./routers/set');
const questionRouter = require('./routers/question')

const app = express();
app.use(cors());
app.use(express.json());
app.use(logger)

app.get("/", (req, res) => {
  res.send("Welcome to the CramRight API! Check out our flashcards.");
});

app.use("/flashcards", flashcardRouter)
app.use("/client", clientRouter)
app.use("/folder", folderRouter)
app.use("/subject", subjectRouter)
app.use("/set", setRouter)
app.use("/question", questionRouter)

module.exports = app;