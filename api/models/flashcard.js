const db = require("../database/connect");

class Flashcard {
    constructor ({ flash_id, subject_id, set_id, client_id, term, definition }) {
        this.id = flash_id;
        this.subject = subject_id;
        this.set = set_id;
        this.client = client_id;
        this.term = term;
        this.definition = definition;
    }

    static async getAll() {
        const response = await db.query("SELECT flash_id, subject_id, set_id, client_id, term, definition FROM flashcard ORDER BY flash_id;");
        return response.rows.map(g => new Flashcard(g));
    }

    static async getOneById(id) {
        const response = await db.query("SELECT flash_id, subject_id, set_id, client_id, term, definition FROM flashcard WHERE flash_id = $1;", [id]);
        if (response.rows.length != 1) {
            throw new Error("Unable to find flashcard.");
        };
        return new Flashcard(response.rows[0]);
    }
}

module.exports = Flashcard;