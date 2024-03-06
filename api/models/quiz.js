const db = require("../database/connect");

class Quiz {
    constructor ({ quiz_id, subject_id, quiz_name, quiz_description }) {
        this.id = quiz_id;
        this.subject = subject_id;
        this.name = quiz_name;
        this.description = quiz_description
       
    }

    static async getAll() {
        const response = await db.query("SELECT quiz_id, subject_id, quiz_name, quiz_description FROM quiz ORDER BY quiz_id;");
        return response.rows.map(g => new Quiz(g));
    }

    static async getOneById(id) {
        const response = await db.query("SELECT quiz_id, subject_id, quiz_name, quiz_description FROM quiz WHERE quiz_id = $1;", [id]);
        if (response.rows.length != 1) {
            throw new Error("Unable to find quiz.");
        };
        return new Quiz(response.rows[0]);
    }

    static async create(body) {
        const {subject, name, description} = body;
        const response = await db.query('INSERT INTO quiz (subject_id, quiz_name, quiz_description) VALUES ($1, $2, $3) RETURNING *;', [subject, name, description]);

        return new Quiz(response.rows[0]);
    }

    async update(body) {
        const {subject, name, description} = body;
        if (!subject || !name || !description) {
            throw new Error("Missing Data!");
        };
        const response = await db.query('UPDATE quiz SET subject_id = $1, quiz_name = $2, quiz_description = $3 WHERE quiz_id = $4 RETURNING *;', [subject, name, description, this.id]);
        return new Quiz(response.rows[0]);
    }

    static async getBySubjectId(id) {
        const response = await db.query( "SELECT quiz_id, subject_id, quiz_name, quiz_description FROM quiz WHERE subject_id = $1;", [id]);
        if (response.rows.length == 0) {
            throw new Error ("Unable to find quiz.");
        };
        return response.rows.map (g => new Quiz(g));
    }


    async destroy() {
        const response = await db.query("DELETE FROM quiz WHERE quiz_id = $1 RETURNING *;", [this.id]);
        return new Quiz(response.rows[0]);
    }

    async getByQuestionId(id) {
        const response = await db.query( "SELECT quiz_id, subject_id, quiz_name, quiz_description FROM quiz WHERE question_id = $1;", [id]);
        if (response.rows.length == 0) {
            throw new Error ("Unable to find quiz.");
        };
        return response.rows.map (g => new Quiz(g));
    }

}



module.exports = Quiz;