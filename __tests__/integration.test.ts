import request from 'supertest';

import app from '../src/app';

describe('POST /task', () => {
  it('creates task in the database with status code 201', async () => {
    const result = await request(app).post('/task').send({ title: 'test task' });
    expect(result.statusCode).toEqual(201);
    expect(result.body).toHaveProperty('id');
    expect(result.body).toHaveProperty('title');
  });
});

describe('POST /task-list', () => {
  it('creates task-list in the database with status code 201', async () => {
    const result = await request(app).post('/task-list').send({ title: 'test task list', listOrder: Math.floor(Math.random() * (500 - 200 + 1)) + 200 });
    expect(result.statusCode).toEqual(201);
    expect(result.body).toHaveProperty('id');
    expect(result.body).toHaveProperty('title');
    expect(result.body).toHaveProperty('list_order');
  });
});
