const Question = require("../models/question.js");

async function index (req,res) {
    try {
        const questions = await Question.getAll();
        res.status(200).json(questions);
    } catch (err) {
        res.status(500).json({"error": err.message})
    }
};

async function show (req, res) {
    try {
        const id = parseInt(req.params.id);
        const question = await Question.getOneById(id);
        res.status(200).json(question);
    } catch (err) {
        res.status(404).json({"error": err.message})
    }
};

async function showQuiz (req, res) {
    try {
        const id = parseInt(req.params.id);
        const questions = await Question.getByQuizId(id);
        res.status(200).json(questions);
    } catch (err) {
        res.status(404).json({"error": err.message})
    }
}

async function create (req, res) {
    try {
        const question = await Question.create(req.body);
        res.status(201).json(question);
    } catch (err) {
        res.status(404).json({"error": err.message})
    }
}

async function update (req, res) {
    try {
        const id = parseInt(req.params.id);
        const question = await Question.getOneById(id);
        const changedQuestion = await question.update(req.body);
        res.status(200).json(changedQuestion);
    } catch (err) {
        res.status(404).json({"error": err.message});
    }
}

async function destroy (req, res) {
    try {
        const id = parseInt(req.params.id);
        const question = await Question.getOneById(id);
        await question.destroy()
        res.status(204).send("Successfully deleted");
    } catch (err) {
        res.status(404).json({"error": err.message});
    }
}

module.exports = {
    index, show, create, update, destroy, showQuiz
}