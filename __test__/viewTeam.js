import request from 'supertest';
import app from '../api';
import config from '../api/config/config';

const { password } = config;

describe('TEAM', () => {
  describe('TEAM TEST', () => {
    const teamRoute = '/api/v1/team';
    const signinRoute = '/api/v1/auth/signin';
    it('ALL TEAMS', async () => {
      const response = await request(app)
        .post(signinRoute)
        .send({
          email: 'cavdy@cavdy.com',
          password
        });
      const res = await request(app)
        .get(`${teamRoute}`)
        .set('Authorization', `Bearer ${response.body.refreshToken}`)
        .send();
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('message');
      expect(res.body).toHaveProperty('status');
      expect(res.body).toHaveProperty('data');
      expect(res.body.data[0]).toHaveProperty('_id');
      expect(res.body.data[0]).toHaveProperty('short_name');
      expect(res.body.data[0]).toHaveProperty('team_name');
      expect(res.body.status).toBe(200);
      expect(res.body.message).toBe('All Teams');
    });

    it('SPECIFIC TEAM', async () => {
      const response = await request(app)
        .post(signinRoute)
        .send({
          email: 'cavdy@cavdy.com',
          password
        });
      const res = await request(app)
        .get(`${teamRoute}/gat`)
        .set('Authorization', `Bearer ${response.body.refreshToken}`)
        .send();
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('message');
      expect(res.body).toHaveProperty('status');
      expect(res.body).toHaveProperty('data');
      expect(res.body.data).toHaveProperty('_id');
      expect(res.body.data).toHaveProperty('short_name');
      expect(res.body.data).toHaveProperty('team_name');
      expect(res.body.status).toBe(200);
    });
  });
});
