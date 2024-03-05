const Folder = require('../models/folder.js');

async function index (req,res) {
    try {
        const folders = await Folder.getAll();
        res.status(200).json(folders);
    } catch (err) {
        res.status(500).json({"error": err.message})
    }
};

async function show (req, res) {
    try {
        const id = parseInt(req.params.id);
        const folder = await Folder.getOneById(id);
        res.status(200).json(folder);
    } catch (err) {
        res.status(404).json({"error": err.message})
    }
};


async function create (req, res) {
    try {
        const folder = await Folder.create(req.body);
        res.status(201).json(folder);
    } catch (err) {
        res.status(404).json({"error": err.message})
    }
}


async function update (req, res) {
    try {
        const id = parseInt(req.params.id);
        const folder = await Folder.getOneById(id);
        const changedFolder = await folder.update(req.body);
        res.status(200).json(changedFolder);
    } catch (err) {
        res.status(404).json({"error": err.message});
    }
}


async function destroy (req, res) {
    try {
        const id = parseInt(req.params.id);
        const folder = await Folder.getOneById(id);
        await folder.destroy()
        res.status(204).send("Successfully deleted");
    } catch (err) {
        res.status(404).json({"error": err.message});
    }
}

module.exports = {
    index, show, create, update, destroy
}