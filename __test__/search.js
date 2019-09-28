import request from 'supertest';
import app from '../api';
import config from '../api/config/config';

const { password } = config;

describe('FIXTURE', () => {
  describe('FIXTURE TEST', () => {
    const searchRoute = '/api/v1/search';
    it('SEARCH', async () => {
      const res = await request(app)
        .post(`${searchRoute}/chelsea`)
        .send();
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('message');
      expect(res.body).toHaveProperty('status');
      expect(res.body).toHaveProperty('data');
      expect(res.body.status).toBe(200);
      expect(res.body.message).toBe('Search Data');
    });
  });
});
