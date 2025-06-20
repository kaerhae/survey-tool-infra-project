import request from 'supertest';
import { describe, it, expect, vi } from 'vitest'

import app from '../src/app';


describe('GET /', () => {
    it('Should return text: "Server up and running!"', async () => {
        const res = await request(app).get("/");
        expect(res.status).toBe(200);
        expect(res.text).toBe('Server up and running!');
    });
})

describe('GET /api', () => {
    it('should return text: "Server API version: v1"', async () => {
        const res = await request(app).get("/api");
        expect(res.status).toBe(200);
        expect(res.text).toBe('Server API version: v1');
    });
})

describe('GET /healthcheck', () => {
    it('should return 200 and return json', async () => {
        const res = await request(app).get("/healthcheck");
        expect(res.status).toBe(200);
        expect(res.body).toStrictEqual({
            "type": "healthcheck",
            "status": "200",
            "message": "OK"
        });
    });
})
