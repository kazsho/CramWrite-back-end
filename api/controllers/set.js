const Set = require("../models/set.js");

async function index (req,res) {
    try {
        const sets = await Set.getAll();
        res.status(200).json(sets);
    } catch (err) {
        res.status(500).json({"error": err.message})
    }
};

async function show (req, res) {
    try {
        const id = parseInt(req.params.id);
        const set = await Set.getOneById(id);
        res.status(200).json(set);
    } catch (err) {
        res.status(404).json({"error": err.message})
    }
};

async function showFolder (req, res) {
    try {
        const id = parseInt(req.params.id);
        const sets = await Set.getByFolderId(id);
        res.status(200).json(sets);
    } catch (err) {
        res.status(404).json({"error": err.message})
    }
}

async function showAllFlashcards(req, res) {
    try {
        const id = parseInt(req.params.id);
        const set = await Set.getOneById(id);
        const flashcards = await set.getFlashcards();
        res.status(200).json(flashcards);
    } catch (err) {
        res.status(404).json({"error": err.message})
    }
}

async function create (req, res) {
    try {
        const set = await Set.create(req.body);
        res.status(201).json(set);
    } catch (err) {
        res.status(404).json({"error": err.message})
    }
}

async function update (req, res) {
    try {
        const id = parseInt(req.params.id);
        const set = await Set.getOneById(id);
        const changedSet = await set.update(req.body);
        res.status(200).json(changedSet);
    } catch (err) {
        res.status(404).json({"error": err.message});
    }
}

async function destroy (req, res) {
    try {
        const id = parseInt(req.params.id);
        const set = await Set.getOneById(id);
        await set.destroy()
        res.status(204).send("Successfully deleted");
    } catch (err) {
        res.status(404).json({"error": err.message});
    }
}

module.exports = {
    index, show, create, update, destroy, showFolder, showAllFlashcards
}