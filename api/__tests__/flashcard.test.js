const app = require('../app')
const request = require('supertest');
const { resetTestDB } = require('./config');

describe('Flashcard Endpoints', () => {
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

    it('GET /flashcards should show all users', async () => {
        const response = await request(api).get('/flashcards').set("Authorization", "b0036e07-d0b4-4a34-8b32-58f889d75598");
        expect(response.type).toEqual(expect.stringContaining('json'));
        response.body.forEach((e) => {
            expect(e).toHaveProperty('id');
            expect(e).toHaveProperty('subject');
            expect(e).toHaveProperty('set');
            expect(e).toHaveProperty('client');
            expect(e).toHaveProperty('term');
            expect(e).toHaveProperty('definition');
            expect(e).toHaveProperty('colour');
        });
    });

    it('POST /flashcards should create a new flashcard', async () => {
        const payload = {"subject": 1, "set": 1, "client": 1, "term": "Proton", "definition": "Positively Charged", "colour": "#000000"};
        await request(api).post('/flashcards').set("Authorization", "b0036e07-d0b4-4a34-8b32-58f889d75598").send(payload);
        const response = await request(api).get('/flashcards').set("Authorization", "b0036e07-d0b4-4a34-8b32-58f889d75598");

        expect(response.body[1].id).toEqual(2);
        expect(response.body[1].subject).toEqual(payload.subject);
        expect(response.body[1].set).toEqual(payload.set);
        expect(response.body[1].client).toEqual(payload.client);
        expect(response.body[1].term).toEqual(payload.term);
        expect(response.body[1].definition).toEqual(payload.definition);
        expect(response.body[1].colour).toEqual(payload.colour);
    });

    it('GET /flashcards/1 should get a specific flashcard', async () => {
        const response = await request(api).get('/flashcards/1').set("Authorization", "b0036e07-d0b4-4a34-8b32-58f889d75598");

        expect(response.status).toEqual(200);
        expect(response.type).toEqual(expect.stringContaining('json'));

        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('subject');
        expect(response.body).toHaveProperty('set');
        expect(response.body).toHaveProperty('client');
        expect(response.body).toHaveProperty('term');
        expect(response.body).toHaveProperty('definition');
        expect(response.body).toHaveProperty('colour');
        expect(response.body.id).toEqual(1);
    });

    it('GET /flashcards/client/1 should get all flashcards related to a certain client', async () => {
        const response = await request(api).get('/flashcards/client/1').set("Authorization", "b0036e07-d0b4-4a34-8b32-58f889d75598");
        expect(response.type).toEqual(expect.stringContaining('json'));
        response.body.forEach((e) => {
            expect(e).toHaveProperty('id');
            expect(e).toHaveProperty('subject');
            expect(e).toHaveProperty('set');
            expect(e).toHaveProperty('client');
            expect(e).toHaveProperty('term');
            expect(e).toHaveProperty('definition');
            expect(e).toHaveProperty('colour');
        });
    });

    it('GET /flashcards/subject/1 should get all flashcards related to a certain subject', async () => {
        const response = await request(api).get('/flashcards/subject/1').set("Authorization", "b0036e07-d0b4-4a34-8b32-58f889d75598");
        expect(response.type).toEqual(expect.stringContaining('json'));
        response.body.forEach((e) => {
            expect(e).toHaveProperty('id');
            expect(e).toHaveProperty('subject');
            expect(e).toHaveProperty('set');
            expect(e).toHaveProperty('client');
            expect(e).toHaveProperty('term');
            expect(e).toHaveProperty('definition');
            expect(e).toHaveProperty('colour');
        });
    });

    it('PATCH /flashcards/1 should update the flashcard at id 1', async () => {
        const payload = {"subject": 1, "set": 1, "term": "Electron", "definition": "The basic building block for all matter in the universe", "colour": "#808080"};
        await request(api).patch('/flashcards/1').send(payload).set("Authorization", "b0036e07-d0b4-4a34-8b32-58f889d75598");
        const response = await request(api).get('/flashcards/1').set("Authorization", "b0036e07-d0b4-4a34-8b32-58f889d75598");

        expect(response.body.term).toEqual(payload.term);
    });

    it('DELETE /flashcards/2 should delete the flashcard at id 2', async () => {
        const payload = {"subject": 1, "set": 1, "client": 1, "term": "Proton", "definition": "Positively Charged", "colour": "#000000"};
        await request(api).post('/flashcards').send(payload).set("Authorization", "b0036e07-d0b4-4a34-8b32-58f889d75598");
        const response = await request(api).delete('/flashcards/2').set("Authorization", "b0036e07-d0b4-4a34-8b32-58f889d75598");

        expect(response.status).toEqual(204);
    });

    it('GET /flashcards/learn_set/1 should get all flashcards related to a certain learn set', async () => {
        const response = await request(api).get('/flashcards/subject/1').set("Authorization", "b0036e07-d0b4-4a34-8b32-58f889d75598");
        expect(response.type).toEqual(expect.stringContaining('json'));
        response.body.forEach((e) => {
            expect(e).toHaveProperty('id');
            expect(e).toHaveProperty('subject');
            expect(e).toHaveProperty('set');
            expect(e).toHaveProperty('client');
            expect(e).toHaveProperty('term');
            expect(e).toHaveProperty('definition');
            expect(e).toHaveProperty('colour');
        });
    });

});