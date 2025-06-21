import request from 'supertest';
import { describe, it, expect } from 'vitest'

import app from '../src/app';

describe('GET /metrics', () => {
    it('should return 200 and return content', async () => {
        const res = await request(app).get("/metrics");
        expect(res.status).toBe(200);
        expect(res.text).not.toBe("");
    });
})
