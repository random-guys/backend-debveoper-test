import request from 'supertest';
import app from '../api';
import config from '../api/config/config';

const { password } = config;

describe('TEAM', () => {
  describe('TEAM TEST', () => {
    const teamRoute = '/api/v1/team/remove';
    const signinRoute = '/api/v1/auth/signin';
    it('DELETE TEAM', async () => {
      const response = await request(app)
        .post(signinRoute)
        .send({
          email: 'cavdy@cavdy.com',
          password
        });
      const res = await request(app)
        .delete(`${teamRoute}/gat`)
        .set('Authorization', `Bearer ${response.body.refreshToken}`)
        .send();
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('message');
      expect(res.body).toHaveProperty('status');
      expect(res.body.status).toBe(200);
      expect(res.body.message).toBe('Team successfully removed');
    });
  });
});
