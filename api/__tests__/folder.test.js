const app = require('../app')
const request = require('supertest');
const bcrypt = require('bcrypt');
const { resetTestDB } = require('./config');

describe('folder Endpoints', () => {
    let api;

    beforeEach(async () => {
        await resetTestDB()
    });

    beforeAll(() => {
        api = app.listen(4100, () => {
            console.log('Test server running on port 4000')
        })
    })

    afterAll((done) => {
        console.log('Closing Server');
        api.close(done);
    })

    it('GET /folder should show all folders', async () => {
        const response = await request(api).get('/folder').set("Authorization", "b0036e07-d0b4-4a34-8b32-58f889d75598");
        console.log(response.body)
        expect(response.type).toEqual(expect.stringContaining('json'));
        response.body.forEach((e) => {
            expect(e).toHaveProperty('id');
            expect(e).toHaveProperty('folder');
            
        });
    });

    it('GET /folder/:id should show 1 folder', async () => {
        const response = await request(api).get('/folder/1').set("Authorization", "b0036e07-d0b4-4a34-8b32-58f889d75598");

        expect(response.status).toEqual(200);
        expect(response.type).toEqual(expect.stringContaining('json'));
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('folder');
        expect(response.body.id).toEqual(1);
    });

    it('GET /folder/:id/set should return all the sets in the folder', async () => {
        const response = await request(api).get('/folder/1/set').set("Authorization", "b0036e07-d0b4-4a34-8b32-58f889d75598");
        expect(response.status).toEqual(200);
        expect(response.type).toEqual(expect.stringContaining('json'));
        response.body.forEach((e) => {
            expect(e).toHaveProperty('id');
            expect(e).toHaveProperty('folder');
            expect(e).toHaveProperty('subject');
            expect(e).toHaveProperty('set');
        })
       
    });

    it('POST /folder should create a new folder', async () => {
        const payload = {"folder": "Test"};
        await request(api).post('/folder').set("Authorization", "b0036e07-d0b4-4a34-8b32-58f889d75598").send(payload);
        const response2 = await request(api).get('/folder').set("Authorization", "b0036e07-d0b4-4a34-8b32-58f889d75598");
        

        expect(response2.body[1].id).toEqual(2);
        expect(response2.body[1].folder).toEqual(payload.folder);
       
    });

    it('PATCH /folder/1 should update the current folder', async () => {
        const payload = {"folder": "Science"};
        await request(api).patch('/folder/1').set("Authorization", "b0036e07-d0b4-4a34-8b32-58f889d75598").send(payload);
        const response = await request(api).get('/folder/1').set("Authorization", "b0036e07-d0b4-4a34-8b32-58f889d75598");

        expect(response.body.folder).toEqual(payload.folder);
    })

    it('DELETE /folder should delete the current folder', async () => {
        const payload = {"folder": "Test"};
        const createResponse = await request(api).post('/folder').set("Authorization", "b0036e07-d0b4-4a34-8b32-58f889d75598").send(payload);
        const folder_id = createResponse.body.id;
    
        const response = await request(api).delete(`/folder/${folder_id}`).set("Authorization", "b0036e07-d0b4-4a34-8b32-58f889d75598");
    
        expect(response.status).toBe(204);
    

    });

}) 
