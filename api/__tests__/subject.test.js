const app = require('../app')
const request = require('supertest');
const bcrypt = require('bcrypt');
const { resetTestDB } = require('./config');

describe('subject Endpoints', () => {
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

    it('GET /subject should show all subjects', async () => {
        const response = await request(api).get('/subject').set("Authorization", "b0036e07-d0b4-4a34-8b32-58f889d75598");
        console.log(response.body)
        expect(response.type).toEqual(expect.stringContaining('json'));
        response.body.forEach((e) => {
            expect(e).toHaveProperty('id');
            expect(e).toHaveProperty('client');
            expect(e).toHaveProperty('subject');
            
        });
    });

    it('GET /subject/:id should show 1 subject', async () => {
        const response = await request(api).get('/subject/1').set("Authorization", "b0036e07-d0b4-4a34-8b32-58f889d75598");

        expect(response.status).toEqual(200);
        expect(response.type).toEqual(expect.stringContaining('json'));
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('client');
        expect(response.body).toHaveProperty('subject');
        expect(response.body.id).toEqual(1);
    });

    it('GET /subject/client/:id should return the user', async () => {
    
        const response = await request(api).get('/subject/client/1').set("Authorization", "b0036e07-d0b4-4a34-8b32-58f889d75598");
        expect(response.status).toEqual(200);
        expect(response.type).toEqual(expect.stringContaining('json'));
        response.body.forEach((e) => {
            expect(e).toHaveProperty('id');
            expect(e).toHaveProperty('client');
            expect(e).toHaveProperty('subject');
           
     })
       
    });

    it('GET /subject/:id/set should return all the sets in the subject', async () => {
        const response = await request(api).get('/subject/1/set').set("Authorization", "b0036e07-d0b4-4a34-8b32-58f889d75598");
        expect(response.status).toEqual(200);
        expect(response.type).toEqual(expect.stringContaining('json'));
        response.body.forEach((e) => {
            expect(e).toHaveProperty('id');
            expect(e).toHaveProperty('subject');
            expect(e).toHaveProperty('set');
           
        })
       
    });

    it('GET /subject/:id/quiz should return all of the quizzes', async () => {
        const response = await request(api).get('/subject/1/quiz').set("Authorization", "b0036e07-d0b4-4a34-8b32-58f889d75598");
        expect(response.status).toEqual(200);
        expect(response.type).toEqual(expect.stringContaining('json'));
        response.body.forEach((e) => {
            expect(e).toHaveProperty('id');
            expect(e).toHaveProperty('name');
            expect(e).toHaveProperty('subject');
            expect(e).toHaveProperty('description');
        })
       
    });

    it('POST /subject should create a new subject', async () => {
        const payload = {"subject": "Test"};
        await request(api).post('/subject').set("Authorization", "b0036e07-d0b4-4a34-8b32-58f889d75598").send(payload);
        const response2 = await request(api).get('/subject').set("Authorization", "b0036e07-d0b4-4a34-8b32-58f889d75598");
        

        expect(response2.body[1].id).toEqual(2);
        expect(response2.body[1].folder).toEqual(payload.folder);
       
    });

    it('PATCH /subject/1 should update the current subject', async () => {
        const payload = {"subject": "Chemistry"};
        await request(api).patch('/subject/1').set("Authorization", "b0036e07-d0b4-4a34-8b32-58f889d75598").send(payload);
        const response = await request(api).get('/subject/1').set("Authorization", "b0036e07-d0b4-4a34-8b32-58f889d75598");

        expect(response.body.subject).toEqual(payload.subject);
    })

    it('DELETE /subject should delete the current subject', async () => {
        const payload = {"subject": "Test"};
        const createResponse = await request(api).post('/subject').set("Authorization", "b0036e07-d0b4-4a34-8b32-58f889d75598").send(payload);
        const subject_id = createResponse.body.id;
    
        const response = await request(api).delete(`/subject/${subject_id}`).set("Authorization", "b0036e07-d0b4-4a34-8b32-58f889d75598");
    
        expect(response.status).toBe(204);

    });

}) 
