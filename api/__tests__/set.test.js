const app = require('../app')
const request = require('supertest');
const { resetTestDB } = require('./config');

describe('Set Endpoints', () => {
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

    it('GET /set should show all learn sets', async () => {
        const response = await request(api).get('/set').set("Authorization", "b0036e07-d0b4-4a34-8b32-58f889d75598");
        expect(response.type).toEqual(expect.stringContaining('json'));
        response.body.forEach((e) => {
            expect(e).toHaveProperty('id');
            expect(e).toHaveProperty('folder');
            expect(e).toHaveProperty('set');
            expect(e).toHaveProperty('subject');
            expect(e).toHaveProperty('colour');
        });
    });

    it('POST /set should create a new learn set', async () => {
        const payload = {"folder": 1, "set": "Test Set", "subject": 1};
        await request(api).post('/set').set("Authorization", "b0036e07-d0b4-4a34-8b32-58f889d75598").send(payload);
        const response = await request(api).get('/set').set("Authorization", "b0036e07-d0b4-4a34-8b32-58f889d75598");

        expect(response.body[1].id).toEqual(2);
        expect(response.body[1].folder).toEqual(payload.folder);
        expect(response.body[1].set).toEqual(payload.set);
        expect(response.body[1].subject).toEqual(payload.subject);
        expect(response.body[1].colour).toEqual('#808080');
    });

    it('GET /set/1 should get a specific learn set', async () => {
        const response = await request(api).get('/set/1').set("Authorization", "b0036e07-d0b4-4a34-8b32-58f889d75598");

        expect(response.status).toEqual(200);
        expect(response.type).toEqual(expect.stringContaining('json'));

        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('folder');
        expect(response.body).toHaveProperty('set');
        expect(response.body).toHaveProperty('subject');
        expect(response.body).toHaveProperty('colour');
        expect(response.body.id).toEqual(1);
    });

    it('GET /set/folder/1 should get all learn sets related to a certain folder', async () => {
        const response = await request(api).get('/set/folder/1').set("Authorization", "b0036e07-d0b4-4a34-8b32-58f889d75598");
        expect(response.type).toEqual(expect.stringContaining('json'));
        response.body.forEach((e) => {
            expect(e).toHaveProperty('id');
            expect(e).toHaveProperty('folder');
            expect(e).toHaveProperty('set');
            expect(e).toHaveProperty('subject');
            expect(e).toHaveProperty('colour');
        });
    });

    it('GET /set/subject/1 should get all learn sets related to a certain subject', async () => {
        const response = await request(api).get('/set/subject/1').set("Authorization", "b0036e07-d0b4-4a34-8b32-58f889d75598");
        expect(response.type).toEqual(expect.stringContaining('json'));
        response.body.forEach((e) => {
            expect(e).toHaveProperty('id');
            expect(e).toHaveProperty('folder');
            expect(e).toHaveProperty('set');
            expect(e).toHaveProperty('subject');
            expect(e).toHaveProperty('colour');
        });
    });

    it('GET /set/1/flashcard should get all flashcards of the learn set', async () => {
        const response = await request(api).get('/set/1/flashcard').set("Authorization", "b0036e07-d0b4-4a34-8b32-58f889d75598");

        expect(response.status).toEqual(200);
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

    it('PATCH /set/1 should update a learn set', async () => {
        const payload = {'folder': 1, 'set': 'Science Set', 'subject': 1, 'colour': '#000000'};
        await request(api).patch('/set/1').send(payload).set("Authorization", "b0036e07-d0b4-4a34-8b32-58f889d75598");
        const response = await request(api).get('/set/1').set("Authorization", "b0036e07-d0b4-4a34-8b32-58f889d75598");

        expect(response.body.colour).toEqual(payload.colour);
    });

    it('DELETE /set/2 should delete a question', async () => {
        const payload = {"folder": 1, "set": "Test Set", "subject": 1};
        await request(api).post('/set').send(payload).set("Authorization", "b0036e07-d0b4-4a34-8b32-58f889d75598");
        const response = await request(api).delete('/set/2').set("Authorization", "b0036e07-d0b4-4a34-8b32-58f889d75598");

        expect(response.status).toEqual(204);
    });
});