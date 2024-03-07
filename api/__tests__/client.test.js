const app = require('../app')
const request = require('supertest');
const bcrypt = require('bcrypt');
const { resetTestDB } = require('./config');

describe('Client Endpoints', () => {
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

    it('GET /client should show all users', async () => {
        const response = await request(api).get('/client').set("Authorization", "b0036e07-d0b4-4a34-8b32-58f889d75598");
        expect(response.type).toEqual(expect.stringContaining('json'));
        response.body.forEach((e) => {
            expect(e).toHaveProperty('id');
            expect(e).toHaveProperty('client');
            expect(e).toHaveProperty('teacher');
            expect(e).toHaveProperty('username');
            expect(e).toHaveProperty('password');
        });
    });

    it('GET /client/:id should show 1 user', async () => {
        const response = await request(api).get('/client/1').set("Authorization", "b0036e07-d0b4-4a34-8b32-58f889d75598");

        expect(response.status).toEqual(200);
        expect(response.type).toEqual(expect.stringContaining('json'));
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('client');
        expect(response.body).toHaveProperty('teacher');
        expect(response.body).toHaveProperty('username');
        expect(response.body).toHaveProperty('password');
        expect(response.body.id).toEqual(1);
    });

    it('GET /client/:id/teacher should return whether the user is a teacher', async () => {
        const response = await request(api).get('/client/1/teacher');

        expect(response.status).toEqual(200);
        expect(response.type).toEqual(expect.stringContaining('json'));
        expect(typeof(response.body)).toEqual("boolean");
    });

    it('POST /client/register should create a new user', async () => {
        const payload = {"client": "Cem", "teacher": false, "username": "Gen10", "password": "1234"};;
        await request(api).post('/client/register').send(payload);
        const response2 = await request(api).get('/client').set("Authorization", "b0036e07-d0b4-4a34-8b32-58f889d75598");
        const authenticated = await bcrypt.compare(payload.password, response2.body[1].password);

        expect(response2.body[1].id).toEqual(2);
        expect(response2.body[1].client).toEqual(payload.client);
        expect(response2.body[1].teacher).toEqual(payload.teacher);
        expect(response2.body[1].username).toEqual(payload.username);
        expect(authenticated).toEqual(true);
    });

    it('PATCH /client/1 should update the current user', async () => {
        const payload = {"client": "Henrietta", "teacher": false, "username": 'Henrie91', "password": '$2b$10$kTzybm7/ThVab2bsNoVHZeEeghkj.cuXYxfJHlgJilqh2xnum9XOW'};
        await request(api).patch('/client/1').send(payload).set("Authorization", "b0036e07-d0b4-4a34-8b32-58f889d75598");
        const response = await request(api).get('/client/1').set("Authorization", "b0036e07-d0b4-4a34-8b32-58f889d75598");

        expect(response.body.teacher).toEqual(payload.teacher);
    })

});