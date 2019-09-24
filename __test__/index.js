import request from 'supertest';
import app from '../api/index';

describe('Index.js', () => {
  it('home route', async () => {
    const res = await request(app)
      .get('/')
      .send();
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message');
    expect(res.body).toHaveProperty('status');
    expect(res.body).toEqual({
      status: 200,
      message: 'API is ready'
    });
  });

  it('route not found', async () => {
    const res = await request(app)
      .get('/good')
      .send();
    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty('message');
    expect(res.body).toHaveProperty('status');
    expect(res.body).toEqual({
      status: 404,
      message: 'Route Not Found'
    });
  });
});
