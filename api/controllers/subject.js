const Subject = require('../models/subject.js');

async function index (req,res) {
    try {
        const subjects = await Subject.getAll();
        res.status(200).json(subjects);
    } catch (err) {
        res.status(500).json({"error": err.message})
    }
};

async function show (req, res) {
    try {
        const id = parseInt(req.params.id);
        const subject = await Subject.getOneById(id);
        res.status(200).json(subject);
    } catch (err) {
        res.status(404).json({"error": err.message})
    }
};


async function create (req, res) {
    try {
        const subject = await Subject.create(req.body);
        res.status(201).json(subject);
    } catch (err) {
        res.status(404).json({"error": err.message})
    }
}

async function update (req, res) {
    try {
        const id = parseInt(req.params.id);
        const subject = await Subject.getOneById(id);
        const changedSubject = await subject.update(req.body);
        res.status(200).json(changedSubject);
    } catch (err) {
        res.status(404).json({"error": err.message});
    }
}

async function showClient (req, res) {
    try {
        const id = parseInt(req.params.id);
        const subject = await Subject.getByClientId(id);
        res.status(200).json(subject)
    } catch (err) {
        res.status(404).json({"error": err.message});
    }
}


async function destroy (req, res) {
    try {
        const id = parseInt(req.params.id);
        const subject = await Subject.getOneById(id);
        await subject.destroy()
        res.status(204).send("Successfully deleted");
    } catch (err) {
        res.status(404).json({"error": err.message});
    }
}

async function showAllSets(req, res) {
    try {
        const id = parseInt(req.params.id);
        const subject = await Subject.getOneById(id);
        const sets = await subject.getSets();
        res.status(200).json(sets);
    } catch (err) {
        res.status(404).json({"error": err.message})
    }
}

async function showAllQuiz(req, res) {
    try {
        const id = parseInt(req.params.id);
        const subject = await Subject.getOneById(id);
        const quiz = await subject.getQuiz();
        res.status(200).json(quiz);
    } catch (err) {
        res.status(404).json({"error": err.message})
    }
}

module.exports = {
    index, show, create, update, showClient, destroy, showAllSets, showAllQuiz
}