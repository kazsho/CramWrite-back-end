const Client = require("../models/Client.js");

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


async function create (req, res) {
    try {
        const client = await Client.create(req.body);
        res.status(201).json(client);
    } catch (err) {
        res.status(404).json({"error": err.message})
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

module.exports = {
    index, show, create, update, destroy
}