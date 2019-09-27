import request from 'supertest';
import app from '../api';
import config from '../api/config/config';

const { password } = config;

describe('FIXTURE', () => {
  describe('FIXTURE TEST', () => {
    const removeRoute = '/api/v1/fixture/remove';
    const createFixtureRoute = '/api/v1/fixture/create';
    const signinRoute = '/api/v1/auth/signin';
    it('DELETE FIXTURES', async () => {
      const response = await request(app)
        .post(signinRoute)
        .send({
          email: 'cavdy@cavdy.com',
          password
        });
      const res = await request(app)
        .post(createFixtureRoute)
        .set('Authorization', `Bearer ${response.body.refreshToken}`)
        .send({
          home: 'manchester united',
          away: 'chelsea',
        });
      const res2 = await request(app)
        .delete(`${removeRoute}/${res.body.data._id}`)
        .set('Authorization', `Bearer ${response.body.refreshToken}`)
        .send();
      expect(res2.statusCode).toEqual(200);
      expect(res2.body).toHaveProperty('message');
      expect(res2.body).toHaveProperty('status');
      expect(res2.body.status).toBe(200);
      expect(res2.body.message).toBe('Fixture successfully removed');
    });
  });
});
