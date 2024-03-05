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

async function showSet (req, res) {
    try {
        const id = parseInt(req.params.id);
        const flashcards = await Flashcard.getBySetId(id);
        res.status(200).json(flashcards);
    } catch (err) {
        res.status(404).json({"error": err.message})
    }
}

async function create (req, res) {
    try {
        const flashcard = await Flashcard.create(req.body);
        res.status(201).json(flashcard);
    } catch (err) {
        res.status(404).json({"error": err.message})
    }
}

async function update (req, res) {
    try {
        const id = parseInt(req.params.id);
        const flashcard = await Flashcard.getOneById(id);
        const changedFlashcard = await flashcard.update(req.body);
        res.status(200).json(changedFlashcard);
    } catch (err) {
        res.status(404).json({"error": err.message});
    }
}

async function showClient (req, res) {
    try {
        const id = parseInt(req.params.id);
        const flashcard = await Flashcard.getByClientId(id);
        res.status(200).json(flashcard)
    } catch (err) {
        res.status(404).json({"error": err.message});
    }
}

async function showSubject (req, res) {
    try {
        const id = parseInt(req.params.id);
        const flashcard = await Flashcard.getBySubjectId(id);
        res.status(200).json(flashcard)
    } catch (err) {
        res.status(404).json({"error": err.message});
    }
}

async function destroy (req, res) {
    try {
        const id = parseInt(req.params.id);
        const flashcard = await Flashcard.getOneById(id);
        await flashcard.destroy()
        res.status(204).send("Successfully deleted");
    } catch (err) {
        res.status(404).json({"error": err.message});
    }
}

module.exports = {
    index, show, showSet, create, update, showClient, showSubject, destroy
}