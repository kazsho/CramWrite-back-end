const db = require("../database/connect");

class Subject {
    constructor ({ subject_id, client_id, subject }) {
        this.id = subject_id;
        this.client = client_id;
        this.subject = subject;
       
    }

    static async getAll() {
        const response = await db.query("SELECT subject_id, client_id, subject  FROM subject ORDER BY subject_id;");
        return response.rows.map(g => new Subject(g));
    }

    static async getOneById(id) {
        const response = await db.query("SELECT subject_id, client_id, subject  FROM subject WHERE subject_id = $1;", [id]);
        if (response.rows.length != 1) {
            throw new Error("Unable to find subject.");
        };
        return new Subject(response.rows[0]);
    }

    static async create(body) {
        const {client_id, subject} = body;
        const response = await db.query('INSERT INTO subject (client_id, subject) VALUES ($1, $2) RETURNING *;', [client_id, subject]);

        return new Subject(response.rows[0]);
    }

    async update(body) {
        const {client_id, subject} = body;
        if (!client_id || !subject) {
            throw new Error("Missing Data!");
        };
        const response = await db.query('UPDATE subject SET client_id = $1, subject= $2 RETURNING *;', [client_id, subject, this.id]);
        return new Subject(response.rows[0]);
    }

    static async getByClientId(id) {
        const response = await db.query( "SELECT subject_id, client_id, subject FROM subject WHERE client_id = $1;", [id]);
        if (response.rows.length == 0) {
            throw new Error ("Unable to find subjects.");
        };
        return response.rows.map (g => new Subject(g));
    }


    async destroy() {
        const response = await db.query("DELETE FROM subject WHERE subject_id = $1 RETURNING *;", [this.id]);
        return new Subject(response.rows[0]);
    }

}



module.exports = Subject;