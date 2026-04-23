import { describe, expect, it } from 'vitest';
import request from 'supertest';
import { buildApp } from './app.js';

describe('API', () => {
  it('GET /health returns ok', async () => {
    const app = buildApp();
    const response = await request(app).get('/health');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: 'ok' });
  });

  it('POST /v1/sessions creates a session', async () => {
    const app = buildApp();
    const response = await request(app).post('/v1/sessions').send({});

    expect(response.status).toBe(201);
    expect(response.body.id).toBeTypeOf('string');
    expect(response.body.createdAt).toBeTypeOf('string');
  });

  it('GET /v1/sessions returns list', async () => {
    const app = buildApp();
    await request(app).post('/v1/sessions').send({});
    const response = await request(app).get('/v1/sessions');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(1);
  });
});
