const app = require('../app.js');
const request = require('supertest');
const bcrypt = require('bcrypt');
const { resetTestDB } = require('./config');

describe('User Endpoints', () => {
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

    it('GET /client should show all users', (done) => {
        const response = request(api).get('/client').set("Authorization", "b0036e07-d0b4-4a34-8b32-58f889d75598").expect(done);

        console.log(response);

        expect(response.statusCode).toEqual(200);
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
        const response = await request.get('/client/1').set("Authorization", "b0036e07-d0b4-4a34-8b32-58f889d75598");

        expect(response.status).toEqual(200);
        expect(response.type).toEqual(expect.stringContaining('json'));
        expect(response.body).toHaveProperty('id');
        expect(response.body)
        expect(response.body).toHaveProperty('client');
        expect(response.body).toHaveProperty('teacher');
        expect(response.body).toHaveProperty('username');
        expect(response.body).toHaveProperty('password');
        expect(response.body.id).toEqual(1);
    });

    it('GET /client/:id/teacher should return whether the user is a teacher', async () => {
        const response = await request.get('/client/1/teacher');

        expect(response.status).toEqual(200);
        expect(response.type).toEqual(expect.stringContaining('json'));
        expect(typeof(response.body)).toEqual("boolean");
    });

    it('POST /client/register should create a new user', async () => {
        const payload = {"client": "Cem", "teacher": false, "username": "Gen10", "password": "1234"};
        const response1 = await request.get('/client').set("Authorization", "b0036e07-d0b4-4a34-8b32-58f889d75598");
        await request.post('/client/register').send(payload);
        const response2 = await request.get('/client').set("Authorization", "b0036e07-d0b4-4a34-8b32-58f889d75598");
        const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUNDS));
        payload.password = await bcrypt.hash(payload.password, salt);

        
        expect(response2.body.slice[-1].id).toEqual(id);
        expect(response2.body.slice[-1].client).toEqual(payload.client);
        expect(response2.body.slice[-1].teacher).toEqual(payload.teacher);
        expect(response2.body.slice[-1].username).toEqual(payload.username);
        expect(response2.body.slice[-1].password).toEqual(payload.password);
    })

});