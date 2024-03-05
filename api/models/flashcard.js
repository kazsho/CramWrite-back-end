const db = require("../database/connect");

class Flashcard {
    constructor ({ flash_id, subject_id, set_id, client_id, term, definition, colour }) {
        this.id = flash_id;
        this.subject = subject_id;
        this.set = set_id;
        this.client = client_id;
        this.term = term;
        this.definition = definition;
        this.colour = colour;
    }

    static async getAll() {
        const response = await db.query("SELECT flash_id, subject_id, set_id, client_id, term, definition, colour FROM flashcard ORDER BY flash_id;");
        return response.rows.map(g => new Flashcard(g));
    }

    static async getOneById(id) {
        const response = await db.query("SELECT flash_id, subject_id, set_id, client_id, term, definition, colour FROM flashcard WHERE flash_id = $1;", [id]);
        if (response.rows.length != 1) {
            throw new Error("Unable to find flashcard.");
        };
        return new Flashcard(response.rows[0]);
    }

    static async getBySetId(id) {
        const response = await db.query("SELECT flash_id, subject_id, set_id, client_id, term, definition, colour FROM flashcard WHERE set_id = $1;", [id]);
        if (response.rows.length == 0) {
            throw new Error("Unable to find flashcards.");
        };
        return response.rows.map(g => new Flashcard(g));
    }

    static async create(body) {
        const {subject, set = null, client, term, definition, colour = null} = body;
        const response = await db.query('INSERT INTO flashcard (subject_id, set_id, client_id, term, definition, colour) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;', [subject, set, client, term, definition, colour]);

        return new Flashcard(response.rows[0]);
    }

    async update(body) {
        const {subject, set, term, definition, colour} = body;
        if (!subject || !set || !term || !definition || !colour) {
            throw new Error("Missing Data!");
        };
        const response = await db.query('UPDATE flashcard SET subject_id = $1, set_id = $2, term = $3, definition = $4, colour = $5 WHERE flash_id = $6 RETURNING *;', [subject, set, term, definition, colour, this.id]);
        return new Flashcard(response.rows[0]);
    }

    static async getByClientId(id) {
        const response = await db.query( "SELECT flash_id, subject_id, set_id, client_id, term, definition, colour FROM flashcard WHERE client_id = $1;", [id]);
        if (response.rows.length == 0) {
            throw new Error ("Unable to find flashcards.");
        };
        return response.rows.map (g => new Flashcard(g));
    }

    static async getBySubjectId(id) {
        const response = await db.query( "SELECT flash_id, subject_id, set_id, client_id, term, definition, colour FROM flashcard WHERE subject_id = $1;", [id]);
        if (response.rows.length == 0) {
            throw new Error ("Unable to find flashcards.");
        };
        return response.rows.map (g => new Flashcard(g));
    }

    async destroy() {
        const response = await db.query("DELETE FROM flashcard WHERE flash_id = $1 RETURNING *;", [this.id]);
        return new Flashcard(response.rows[0]);
    }

}



module.exports = Flashcard;