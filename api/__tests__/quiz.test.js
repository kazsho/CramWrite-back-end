const app = require('../app')
const request = require('supertest');
const bcrypt = require('bcrypt');
const { resetTestDB } = require('./config');

describe('quiz Endpoints', () => {
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

    it('GET /quiz should show all quizzes', async () => {
        const response = await request(api).get('/quiz').set("Authorization", "b0036e07-d0b4-4a34-8b32-58f889d75598");
        console.log(response.body)
        expect(response.type).toEqual(expect.stringContaining('json'));
        response.body.forEach((e) => {
            expect(e).toHaveProperty('id');
            expect(e).toHaveProperty('name');
            expect(e).toHaveProperty('subject');
            expect(e).toHaveProperty('description');
            
        });
    });

    it('GET /quiz/:id should show 1 quiz', async () => {
        const response = await request(api).get('/quiz/1').set("Authorization", "b0036e07-d0b4-4a34-8b32-58f889d75598");

        expect(response.status).toEqual(200);
        expect(response.type).toEqual(expect.stringContaining('json'));
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('name');
        expect(response.body).toHaveProperty('subject');
        expect(response.body).toHaveProperty('description');
        expect(response.body.id).toEqual(1);
    });

    // it('GET /quiz/subject/:id should return the subject of the quiz', async () => {
    
    //     const response = await request(api).get('/quiz/subject/1').set("Authorization", "b0036e07-d0b4-4a34-8b32-58f889d75598");
    //     expect(response.status).toEqual(200);
    //     expect(response.type).toEqual(expect.stringContaining('json'));
    //     response.body.forEach((e) => {
    //         expect(e).toHaveProperty('id');
    //         expect(e).toHaveProperty('name');
    //         expect(e).toHaveProperty('subject');
    //         expect(e).toHaveProperty('description');
            
           
    //  })
       
    });

    it('GET /quiz/:id/question should return all the questions in the quiz', async () => {
        const response = await request(api).get('/quiz/1/question').set("Authorization", "b0036e07-d0b4-4a34-8b32-58f889d75598");
        expect(response.status).toEqual(200);
        expect(response.type).toEqual(expect.stringContaining('json'));
        response.body.forEach((e) => {
            expect(e).toHaveProperty('id');
            expect(e).toHaveProperty('quiz');
            expect(e).toHaveProperty('good_answer');
            expect(e).toHaveProperty('bad_answer1');
            expect(e).toHaveProperty('bad_answer2');
            expect(e).toHaveProperty('bad_answer3');

        })
       
    });


    it('POST /quiz should create a new quiz', async () => {
        const payload = {"quiz": "Test"};
        await request(api).post('/quiz').set("Authorization", "b0036e07-d0b4-4a34-8b32-58f889d75598").send(payload);
        const response2 = await request(api).get('/quiz').set("Authorization", "b0036e07-d0b4-4a34-8b32-58f889d75598");
        

        expect(response2.body[1].id).toEqual(2);
        expect(response2.body[1].subject).toEqual(payload.subject);
        expect(response2.body[1].name).toEqual(payload.name);
        expect(response2.body[1].description).toEqual(payload.description);
       
    });

    // it('PATCH /quiz/1 should update the current quiz', async () => {
    //     const payload = {"quiz": "Periodic Table"};
    //     await request(api).patch('/quiz/1').set("Authorization", "b0036e07-d0b4-4a34-8b32-58f889d75598").send(payload);
    //     const response = await request(api).get('/quiz/1').set("Authorization", "b0036e07-d0b4-4a34-8b32-58f889d75598");

    //     expect(response.body.quiz).toEqual(payload.quiz);
    // })

    // it('DELETE /quiz should delete the current quiz', async () => {
    //     const payload = {"quiz": "Test"};
    //     const createResponse = await request(api).post('/quiz').set("Authorization", "b0036e07-d0b4-4a34-8b32-58f889d75598").send(payload);
    //     const quiz_id = createResponse.body.id;
    
    //     const response = await request(api).delete(`/quiz/${quiz_id}`).set("Authorization", "b0036e07-d0b4-4a34-8b32-58f889d75598");
    
    //     expect(response.status).toBe(204);

    // });

