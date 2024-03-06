const db = require("../database/connect");

class Client {
    constructor ({ client_id, client, is_teacher, username, password }) {
        this.id = client_id;
        this.client = client;
        this.teacher = is_teacher;
        this.username = username;
        this.password = password;
        
}

static async getAll() {
    const response = await db.query("SELECT client_id, client, is_teacher, username, password  FROM client ORDER BY client_id;");
    return response.rows.map(g => new Client(g));
}

static async getOneById(id) {
    const response = await db.query("SELECT client_id, client, is_teacher, username, password FROM client WHERE client_id = $1;", [id]);
    if (response.rows.length != 1) {
        throw new Error("Unable to find user.");
    };
    return new Client(response.rows[0]);
}

static async create(body) {
    const {client, teacher, username, password} = body;
    const response = await db.query('INSERT INTO client (client, is_teacher, username, password) VALUES ($1, $2, $3, $4) RETURNING *;', [client, teacher, username, password]);

    return new Client(response.rows[0]);
}

async update(body) {
    const {client, teacher, username, password} = body;
    console.log(teacher)
    if (!client || (!teacher && teacher !== false) || !username || !password) {
        throw new Error("Missing Data!");
    };
    const response = await db.query('UPDATE client SET client = $1, is_teacher = $2, username = $3, password = $4 WHERE client_id = $5 RETURNING *;', [client, teacher, username, password, this.id]);
    return new Client(response.rows[0]);
}

async destroy() {
    const response = await db.query("DELETE FROM client WHERE client_id = $1 RETURNING *;", [this.id]);
    return new Client(response.rows[0]);
}


}

module.exports = Client;