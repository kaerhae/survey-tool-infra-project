import request from 'supertest';
import { describe, it, expect } from 'vitest'

import app from '../src/app';


describe('GET /api', () => {
    it('Should return message: "Server up and running!"', async () => {
        const res = await request(app).get("/api");
        expect(res.status).toBe(200);
        expect(res.text).toBe('Server up and running!');
    });
})