const Flashcard = require('../models/flashcard.js');

async function index (req,res) {
    try {
        const flashcards = await Flashcard.getAll();
        res.status(200).json(flashcards);
    } catch (err) {
        res.status(500).json({"error": err.message})
    }
};

async function show (req, res) {
    try {
        const id = parseInt(req.params.id);
        const flashcard = await Flashcard.getOneById(id);
        res.status(200).json(flashcard);
    } catch (err) {
        res.status(404).json({"error": err.message})
    }
};

module.exports = {
    index, show
}