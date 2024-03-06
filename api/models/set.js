const db = require("../database/connect");
const Flashcard = require("./flashcard");

class Set {
    constructor ({ set_id, folder_id, learn_set }) {
        this.id = set_id;
        this.folder = folder_id;
        this.set = learn_set;
    }

    static async getAll() {
        const response = await db.query("SELECT set_id, folder_id, learn_set FROM learn_set ORDER BY set_id;");
        return response.rows.map(g => new Set(g));
    }

    static async getOneById(id) {
        const response = await db.query("SELECT set_id, folder_id, learn_set FROM learn_set WHERE set_id = $1;", [id]);
        if (response.rows.length != 1) {
            throw new Error("Unable to find learn set.");
        };
        return new Set(response.rows[0]);
    }

    static async getByFolderId(id) {
        const response = await db.query("SELECT set_id, folder_id, learn_set FROM learn_set WHERE folder_id = $1;", [id]);
        if (response.rows.length == 0) {
            throw new Error("Unable to find learn sets.");
        };
        return response.rows.map(g => new Set(g));
    }

    static async create(body) {
        const {folder = null, set} = body;
        const response = await db.query('INSERT INTO learn_set (folder_id, learn_set) VALUES ($1, $2) RETURNING *;', [folder, set]);

        return new Set(response.rows[0]);
    }

    async update(body) {
        const {folder, set} = body;
        if (!folder || !set) {
            throw new Error("Missing Data!");
        };
        const response = await db.query('UPDATE learn_set SET folder_id = $1, learn_set = $2 WHERE set_id = $3 RETURNING *;', [folder, set, this.id]);
        return new Set(response.rows[0]);
    }

    async destroy() {
        const response = await db.query("DELETE FROM learn_set WHERE set_id = $1 RETURNING *;", [this.id]);
        return new Set(response.rows[0]);
    }

    async getFlashcards() {
        const response = await Flashcard.getBySetId(this.id)
        return response;
    }
}



module.exports = Set;