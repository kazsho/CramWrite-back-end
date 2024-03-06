const { v4: uuidv4 } = require("uuid");

const db = require("../database/connect");

class Token {
    constructor({ token_id, client_id, token }) {
        this.token_id = token_id;
        this.client = client_id;
        this.token = token;
    }

    static async create(client_id) {
        const token = uuidv4();
        let response = await db.query("INSERT INTO token (client_id, token) VALUES ($1, $2) RETURNING *;", [client_id, token]);

        return new Token(response.rows[0]);
    }

    static async getOneById(id) {
        const response = await db.query("SELECT * FROM token WHERE token_id = $1;", [id]);
        if (response.rows.length != 1) {
            throw new Error("Unable to locate token.");
        }
        return new Token(response.rows[0]);
    }

    static async getOneByToken(token) {
        const response = await db.query("SELECT * FROM token WHERE token = $1;", [token]);
        if (response.rows.length != 1) {
            throw new Error("Unable to locate token.");
        }
        return new Token(response.rows[0]);
    }
}

module.exports = Token;