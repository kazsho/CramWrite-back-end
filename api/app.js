const express = require('express');
const cors = require('cors');
const logger = require('./middleware/logger.js');

const app = express();
app.use(cors());
app.use(express.json());
app.use(logger)

app.get("/", (req, res) => {
  res.send("Welcome to the CramRight API! Check out our flashcards.");
});

module.exports = app;