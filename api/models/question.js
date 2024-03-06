const db = require("../database/connect");

class Question {
    constructor ({ question_id, quiz_id, question, good_answer, bad_answer1, bad_answer2, bad_answer3 }) {
        this.id = question_id;
        this.quiz = quiz_id;
        this.question = question;
        this.good_answer = good_answer;
        this.bad_answer1 = bad_answer1;
        this.bad_answer2 = bad_answer2;
        this.bad_answer3 = bad_answer3;
    }

    static async getAll() {
        const response = await db.query("SELECT question_id, quiz_id, question, good_answer, bad_answer1, bad_answer2, bad_answer3 FROM question ORDER BY question_id;");
        return response.rows.map(g => new Question(g));
    }

    static async getOneById(id) {
        const response = await db.query("SELECT question_id, quiz_id, question, good_answer, bad_answer1, bad_answer2, bad_answer3 FROM question WHERE question_id = $1;", [id]);
        if (response.rows.length != 1) {
            throw new Error("Unable to find question.");
        };
        return new Question(response.rows[0]);
    }

    static async getByQuizId(id) {
        const response = await db.query("SELECT question_id, quiz_id, question, good_answer, bad_answer1, bad_answer2, bad_answer3 FROM question WHERE quiz_id = $1;", [id]);
        if (response.rows.length == 0) {
            throw new Error("Unable to find questions.");
        };
        return response.rows.map(g => new Question(g));
    }

    static async create(body) {
        const {quiz, question, good_answer, bad_answer1, bad_answer2, bad_answer3} = body;
        const response = await db.query('INSERT INTO question (quiz_id, question, good_answer, bad_answer1, bad_answer2, bad_answer3) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;', [quiz, question, good_answer, bad_answer1, bad_answer2, bad_answer3]);

        return new Question(response.rows[0]);
    }

    async update(body) {
        const {question, good_answer, bad_answer1, bad_answer2, bad_answer3} = body;
        if (!question || !good_answer || !bad_answer1 || !bad_answer2 || !bad_answer3) {
            throw new Error("Missing Data!");
        };
        const response = await db.query('UPDATE question SET question = $1, good_answer = $2, bad_answer1 = $3, bad_answer2 = $4, bad_answer3 = $5 WHERE question_id = $6 RETURNING *;', [question, good_answer, bad_answer1, bad_answer2, bad_answer3, this.id]);
        return new Question(response.rows[0]);
    }

    async destroy() {
        const response = await db.query("DELETE FROM question WHERE question_id = $1 RETURNING *;", [this.id]);
        return new Question(response.rows[0]);
    }
}



module.exports = Question;