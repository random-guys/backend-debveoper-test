import request from 'supertest';
import app from '../api';
import config from '../api/config/config';

const { password } = config;

describe('TEAM', () => {
  describe('TEAM TEST', () => {
    const teamRoute = '/api/v1/team/edit';
    const signinRoute = '/api/v1/auth/signin';
    it('EDIT TEAM', async () => {
      const response = await request(app)
        .post(signinRoute)
        .send({
          email: 'cavdy@cavdy.com',
          password
        });
      const res = await request(app)
        .patch(`${teamRoute}/gat`)
        .set('Authorization', `Bearer ${response.body.refreshToken}`)
        .send({
          teamName: 'getafe fc',
        });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('message');
      expect(res.body).toHaveProperty('status');
      expect(res.body.status).toBe(200);
      expect(res.body.message).toBe('Team successfully updated');
    });

    it('EDIT TEAM 2', async () => {
      const response = await request(app)
        .post(signinRoute)
        .send({
          email: 'cavdy@cavdy.com',
          password
        });
      const res = await request(app)
        .patch(`${teamRoute}/gat`)
        .set('Authorization', `Bearer ${response.body.refreshToken}`)
        .send({
          shortName: '',
          teamName: ''
        });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('message');
      expect(res.body).toHaveProperty('status');
      expect(res.body.status).toBe(200);
      expect(res.body.message).toBe('Team successfully updated');
    });

    it('EDIT TEAM VALIDATION WRONG DATA', async () => {
      const response = await request(app)
        .post(signinRoute)
        .send({
          email: 'cavdy@cavdy.com',
          password
        });
      const res = await request(app)
        .patch(`${teamRoute}/gat`)
        .set('Authorization', `Bearer ${response.body.refreshToken}`)
        .send({
          shortName: 'c',
          teamName: 'c',
        });
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('message');
      expect(res.body).toHaveProperty('status');
      expect(res.body).toHaveProperty('data');
      expect(res.body.data).toHaveProperty('shortName');
      expect(res.body.data).toHaveProperty('teamName');
      expect(res.body.status).toBe(400);
      expect(res.body.message).toBe('Fields are required');
      expect(res.body.data.shortName)
        .toBe('Short Name should be at least 2 and 10 characters long');
      expect(res.body.data.teamName)
        .toBe('Team Name should be at least 5 and 30 characters long');
    });

    it('EDIT TEAM VALIDATION WRONG DATA 2', async () => {
      const response = await request(app)
        .post(signinRoute)
        .send({
          email: 'cavdy@cavdy.com',
          password
        });
      const res = await request(app)
        .patch(`${teamRoute}/gat`)
        .set('Authorization', `Bearer ${response.body.refreshToken}`)
        .send({
          shortName: '72365fsd',
          teamName: '97fg5ar',
        });
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('message');
      expect(res.body).toHaveProperty('status');
      expect(res.body).toHaveProperty('data');
      expect(res.body.data).toHaveProperty('shortName');
      expect(res.body.data).toHaveProperty('teamName');
      expect(res.body.status).toBe(400);
      expect(res.body.message).toBe('Fields are required');
      expect(res.body.data.shortName)
        .toBe('Short Name should be an alphabet');
      expect(res.body.data.teamName)
        .toBe('Team Name should be an alphabet');
    });

    it('EDIT TEAM VALIDATION TEAM DONT EXIST', async () => {
      const response = await request(app)
        .post(signinRoute)
        .send({
          email: 'cavdy@cavdy.com',
          password
        });
      const res = await request(app)
        .patch(`${teamRoute}/gat2`)
        .set('Authorization', `Bearer ${response.body.refreshToken}`)
        .send({
          shortName: '72365fsd',
          teamName: '97fg5ar',
        });
      expect(res.statusCode).toEqual(404);
      expect(res.body).toHaveProperty('message');
      expect(res.body).toHaveProperty('status');
      expect(res.body.status).toBe(404);
      expect(res.body.message).toBe('Team does not exist');
    });
  });
});
