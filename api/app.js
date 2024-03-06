const express = require('express');
const cors = require('cors');
const logger = require('./middleware/logger.js');
const authenticator = require('./middleware/authenticator.js');

const flashcardRouter = require('./routers/flashcard');
const clientRouter = require('./routers/client');
const folderRouter = require('./routers/folder');
const subjectRouter = require('./routers/subject');
const quizRouter = require('./routers/quiz');
const setRouter = require('./routers/set');
const questionRouter = require('./routers/question')

const app = express();
app.use(cors());
app.use(express.json());
app.use(logger)

app.get("/", (req, res) => {
  res.send("Welcome to the CramRight API! Check out our flashcards.");
});

app.use("/flashcards", authenticator, flashcardRouter)
app.use("/client", clientRouter)
app.use("/folder", authenticator, folderRouter)
app.use("/subject", authenticator, subjectRouter)
app.use("/set", authenticator, setRouter)
app.use("/question", authenticator, questionRouter)
app.use("/quiz", authenticator, quizRouter)

module.exports = app;