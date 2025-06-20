import request from 'supertest';
import { describe, it, expect, beforeAll } from 'vitest'

import app from '../src/app';
import { NewSurvey } from '../src/types/types';

describe('GET /api/surveys', () => {
    it('should return 200 and return json', async () => {
        const res = await request(app).get("/api/surveys");
        expect(res.status).toBe(200);
        expect(res.body).toStrictEqual([]);
    });
})

describe('POST /api/surveys', () => {
    it('should return 201 and return json', async () => {
        const title = "test title";
        const data: NewSurvey = {
            "title": title,
            questions: [],
        }
        const res = await request(app)
            .post("/api/surveys")
            .send(data)
            .set("Content-Type", "application/json");
        expect(res.status).toBe(201);
        expect(res.body).toStrictEqual({
            "status": 201,
            "message": `Survey titled "${title}" succesfully added`
        });
    });
})

describe('PUT /api/surveys', () => {
    const title = "test title";
    let existing;
    beforeAll(async () => {
        const data: NewSurvey = {
            "title": title,
            questions: [],
        }

        await request(app)
            .post("/api/surveys")
            .send(data);
        const surveys = await request(app).get("/api/surveys");
        existing = surveys.body.find(x => x.title === title);
    })

    it('should return 204 and return json', async () => {
         const res = await request(app)
            .put("/api/surveys")
            .send(existing)
            .set("Content-Type", "application/json")
            .set("accept", "application/json")
        expect(res.status).toBe(204);
    });
})