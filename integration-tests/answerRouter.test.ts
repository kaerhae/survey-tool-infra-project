import request from 'supertest';
import { describe, it, expect, beforeAll } from 'vitest'

import app from '../src/app';
import { NewSingleAnsweredSurvey, NewSSurveyTemplate } from '../src/types/types';


describe('GET /api/answers/:id', () => {
    let existing;
    beforeAll(async () => {
        const data: NewSSurveyTemplate = {
            "title": "title",
            questions: [],
        }

        await request(app)
            .post("/api/surveys")
            .send(data);
        const surveys = await request(app).get("/api/surveys");
        existing = surveys.body.find(x => x.title === "title");
    })
    it('should return 404 if no template', async () => {
        const res = await request(app).get("/api/answers/23");
        expect(res.status).toBe(404);
        expect(res.body).toStrictEqual({
            "status": 404,
            "message": `No surveys found by id: 23`
        });
    });

    it('should return 200 and result', async () => {
        const res = await request(app).get(`/api/answers/${existing.id}`);
        expect(res.status).toBe(200);
    });
})


describe('POST /api/answers/', () => {
    const title = "test title";
    let existing;
    beforeAll(async () => {
        const data: NewSSurveyTemplate = {
            "title": title,
            questions: [],
        }

        await request(app)
            .post("/api/surveys")
            .send(data);
        const surveys = await request(app).get("/api/surveys");
        existing = surveys.body.find(x => x.title === title);
    })
    it('should return 201 and json', async () => {
        const data: NewSingleAnsweredSurvey =  {
            templateId: existing.id,
            answeredQuestions: []
        } 
        const res = await request(app)
            .post("/api/answers")
            .send(data);
        expect(res.status).toBe(201);
        expect(res.body).toStrictEqual({
            "status": 201,
            "message": `Survey answers successfully added!`
        });
    });

    it('should return 500, when no template id found', async () => {
        const data: NewSingleAnsweredSurvey =  {
            templateId: "foobar",
            answeredQuestions: []
        } 
        const res = await request(app)
            .post("/api/answers")
            .send(data);
        expect(res.status).toBe(500);
    });
})
