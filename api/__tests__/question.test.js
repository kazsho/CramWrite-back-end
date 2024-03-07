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

    it('GET /question should show all users', async () => {
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
});