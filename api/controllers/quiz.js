const Quiz = require('../models/quiz.js');

async function index (req,res) {
    try {
        const quiz = await Quiz.getAll();
        res.status(200).json(quiz);
    } catch (err) {
        res.status(500).json({"error": err.message})
    }
};

async function show (req, res) {
    try {
        const id = parseInt(req.params.id);
        const quiz = await Quiz.getOneById(id);
        res.status(200).json(quiz);
    } catch (err) {
        res.status(404).json({"error": err.message})
    }
};


async function create (req, res) {
    try {
        const quiz = await Quiz.create(req.body);
        res.status(201).json(quiz);
    } catch (err) {
        res.status(404).json({"error": err.message})
    }
}

async function update (req, res) {
    try {
        const id = parseInt(req.params.id);
        const quiz = await Quiz.getOneById(id);
        const changedQuiz = await quiz.update(req.body);
        res.status(200).json(changedQuiz);
    } catch (err) {
        res.status(404).json({"error": err.message});
    }
}

async function showSubject (req, res) {
    try {
        const id = parseInt(req.params.id);
        const quiz = await Quiz.getBySubjectId(id);
        res.status(200).json(quiz)
    } catch (err) {
        res.status(404).json({"error": err.message});
    }
}


async function destroy (req, res) {
    try {
        const id = parseInt(req.params.id);
        const quiz = await Quiz.getOneById(id);
        await quiz.destroy()
        res.status(204).send("Successfully deleted");
    } catch (err) {
        res.status(404).json({"error": err.message});
    }
}

async function showAllQuestions (req, res) {
    try {
        const id = parseInt(req.params.id);
        const quiz = await Quiz.getOneById(id);
        const questions = await quiz.getQuestions();
        res.status(200).json(questions)
    } catch (err) {
        res.status(404).json({"error": err.message});
    }
}



module.exports = {
    index, show, create, update, showSubject, destroy, showAllQuestions
}