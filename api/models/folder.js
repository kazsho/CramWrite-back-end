const db = require("../database/connect");
const Set = require("./set");

class Folder {
    constructor ({ folder_id, folder }) {
        this.id = folder_id;
        this.folder = folder;
               
}

static async getAll() {
    const response = await db.query("SELECT folder_id, folder FROM folder ORDER BY folder_id;");
    return response.rows.map(g => new Folder(g));
}

static async getOneById(id) {
    const response = await db.query("SELECT folder_id, folder FROM folder WHERE folder_id = $1;", [id]);
    if (response.rows.length != 1) {
        throw new Error("Unable to find folder.");
    };
    return new Folder(response.rows[0]);
}

static async create(body) {
    const {folder} = body;
    const response = await db.query('INSERT INTO folder (folder) VALUES ($1) RETURNING *;', [folder]);

    return new Folder(response.rows[0]);
}

async update(body) {
    const {folder} = body;
    if (!folder) {
        throw new Error("Missing Data!");
    };
    const response = await db.query('UPDATE folder SET folder = $1 RETURNING *;', [folder, this.id]);
    return new Folder(response.rows[0]);
}

async destroy() {
    const response = await db.query("DELETE FROM folder WHERE folder_id = $1 RETURNING *;", [this.id]);
    return new Folder(response.rows[0]);
}

async getSets() {
    const response = await Set.getByFolderId(this.id);
    return response
}

}

module.exports = Folder;