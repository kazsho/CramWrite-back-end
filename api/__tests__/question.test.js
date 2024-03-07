const app = require('../app')
const request = require('supertest');
const { resetTestDB } = require('./config');

describe('Question Endpoints', () => {
    let api;

    beforeEach(async () => {
        await resetTestDB()
    });

    beforeAll(() => {
        api = app.listen(4000, () => {
            console.log('Test server running on port 4000')
        })
    })

    afterAll((done) => {
        console.log('Closing Server');
        api.close(done);
    })

    it('GET /question should show all questions', async () => {
        const response = await request(api).get('/question').set("Authorization", "b0036e07-d0b4-4a34-8b32-58f889d75598");
        expect(response.type).toEqual(expect.stringContaining('json'));
        response.body.forEach((e) => {
            expect(e).toHaveProperty('id');
            expect(e).toHaveProperty('quiz');
            expect(e).toHaveProperty('question');
            expect(e).toHaveProperty('good_answer');
            expect(e).toHaveProperty('bad_answer1');
            expect(e).toHaveProperty('bad_answer2');
            expect(e).toHaveProperty('bad_answer3');
        });
    });
    
    it('POST /question should create new question', async () => {
        const payload = {"quiz": 1, "question": "Test", "good_answer": "Yes", "bad_answer1": "No1", "bad_answer2": "No2", "bad_answer3": "No3"};
        await request(api).post('/question').set("Authorization", "b0036e07-d0b4-4a34-8b32-58f889d75598").send(payload);
        const response = await request(api).get('/question').set("Authorization", "b0036e07-d0b4-4a34-8b32-58f889d75598");

        expect(response.body[1].id).toEqual(2);
        expect(response.body[1].quiz).toEqual(payload.quiz);
        expect(response.body[1].question).toEqual(payload.question);
        expect(response.body[1].good_answer).toEqual(payload.good_answer);
        expect(response.body[1].bad_answer1).toEqual(payload.bad_answer1);
        expect(response.body[1].bad_answer2).toEqual(payload.bad_answer2);
        expect(response.body[1].bad_answer3).toEqual(payload.bad_answer3);
    });

    it('GET /question/1 should get a specific question', async () => {
        const response = await request(api).get('/question/1').set("Authorization", "b0036e07-d0b4-4a34-8b32-58f889d75598");

        expect(response.status).toEqual(200);
        expect(response.type).toEqual(expect.stringContaining('json'));

        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('quiz');
        expect(response.body).toHaveProperty('question');
        expect(response.body).toHaveProperty('good_answer');
        expect(response.body).toHaveProperty('bad_answer1');
        expect(response.body).toHaveProperty('bad_answer2');
        expect(response.body).toHaveProperty('bad_answer3');
        expect(response.body.id).toEqual(1);
    });

    it('GET /question/quiz/1 should get all questions related to a certain quiz', async () => {
        const response = await request(api).get('/question/quiz/1').set("Authorization", "b0036e07-d0b4-4a34-8b32-58f889d75598");
        expect(response.type).toEqual(expect.stringContaining('json'));
        response.body.forEach((e) => {
            expect(e).toHaveProperty('id');
            expect(e).toHaveProperty('quiz');
            expect(e).toHaveProperty('question');
            expect(e).toHaveProperty('good_answer');
            expect(e).toHaveProperty('bad_answer1');
            expect(e).toHaveProperty('bad_answer2');
            expect(e).toHaveProperty('bad_answer3');
        });
    });

    it('PATCH /question/1 should update a question', async () => {
        const payload = {"quiz": 1, "question": "Question: What is an isotope?", "good_answer": "same number of protons, different number of neutrons", "bad_answer1": "same number of protons and different number of electrons", "bad_answer2": "same number of neutrons, different number of electrons", "bad_answer3": "same number of protons and neutrons"};
        await request(api).patch('/question/1').send(payload).set("Authorization", "b0036e07-d0b4-4a34-8b32-58f889d75598");
        const response = await request(api).get('/question/1').set("Authorization", "b0036e07-d0b4-4a34-8b32-58f889d75598");

        expect(response.body.question).toEqual(payload.question);
    });

    it('DELETE /question/1 should delete a question', async () => {
        const payload = {"quiz": 1, "question": "Test", "good_answer": "Yes", "bad_answer1": "No1", "bad_answer2": "No2", "bad_answer3": "No3"};
        await request(api).post('/question').send(payload).set("Authorization", "b0036e07-d0b4-4a34-8b32-58f889d75598");
        const response = await request(api).delete('/question/2').set("Authorization", "b0036e07-d0b4-4a34-8b32-58f889d75598");

        expect(response.status).toEqual(204);
    });
});