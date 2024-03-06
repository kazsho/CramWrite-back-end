const Client = require("../models/Client.js");
const Token = require("../models/token.js");
const bcrypt = require("bcrypt");

async function index (req,res) {
    try {
        const clients = await Client.getAll();
        res.status(200).json(clients);
    } catch (err) {
        res.status(500).json({"error": err.message})
    }
};

async function show (req, res) {
    try {
        const id = parseInt(req.params.id);
        const client = await Client.getOneById(id);
        res.status(200).json(client);
    } catch (err) {
        res.status(404).json({"error": err.message})
    }
};

async function register (req, res) {
    try {
        const data = req.body;
        const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUNDS));
        data.password = await bcrypt.hash(data.password, salt);

        const client = await Client.create(req.body);
        res.status(201).json(client);
    } catch (err) {
        res.status(404).json({"error": err.message});
    }
}

async function showToken (req, res) {
    try {
        const data = req.params.token;
        const token = await Token.getOneByToken(data);
        const client = await Client.getOneById(token.client);

        res.status(200).json(client);
    } catch (err) {
        res.status(404).json({"error": err.message});
    }
}

async function login (req, res) {
    try {
        const data = req.body;
        const client = await Client.getOneByUsername(data.username);
        const authenticated = await bcrypt.compare(data.password, client.password);

        if(!authenticated) {
            throw new Error('Incorrect Credentials');
        }
        const token = await Token.create(client.id);
        res.status(200).json({"authenticated": true, "token": token.token});
    } catch (err) {
        res.status(401).json({"error": err.message});
    }
}

async function update (req, res) {
    try {
        const id = parseInt(req.params.id);
        const client = await Client.getOneById(id);
        const changedClient = await client.update(req.body);
        res.status(200).json(changedClient);
    } catch (err) {
        res.status(404).json({"error": err.message});
    }
}


async function destroy (req, res) {
    try {
        const id = parseInt(req.params.id);
        const client = await Client.getOneById(id);
        await client.destroy()
        res.status(204).send("Successfully deleted");
    } catch (err) {
        res.status(404).json({"error": err.message});
    }
}

async function checkTeacher (req, res) {
    try {
        const id = parseInt(req.params.id);
        const client = await Client.getOneById(id);
        const teacher = await client.checkTeacher();
        res.status(200).send(teacher);
    } catch (err) {
        res.status(404).json({"error": err.message})
    }
}

async function showAllFlashcards(req, res) {
    try {
        const id = parseInt(req.params.id);
        const client = await Client.getOneById(id);
        const flashcards = await client.getFlashcards();
        res.status(200).json(flashcards);
    } catch (err) {
        res.status(404).json({"error": err.message})
    }
}

async function showAllSubjects(req, res) {
    try {
        const id = parseInt(req.params.id);
        const client = await Client.getOneById(id);
        const subjects = await client.getSubjects();
        res.status(200).json(subjects);
    } catch (err) {
        res.status(404).json({"error": err.message})
    }
}

module.exports = {
    index, show, register, update, destroy, checkTeacher, login, showToken, showAllFlashcards, showAllSubjects
}