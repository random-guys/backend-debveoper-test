import request from 'supertest';
import app from '../api';
import config from '../api/config/config';

const { password } = config;

describe('TEAM', () => {
  describe('TEAM TEST', () => {
    const teamRoute = '/api/v1/team/create';
    const signinRoute = '/api/v1/auth/signin';
    it('CREATE TEAM', async () => {
      const response = await request(app)
        .post(signinRoute)
        .send({
          email: 'cavdy@cavdy.com',
          password
        });
      const res = await request(app)
        .post(teamRoute)
        .set('Authorization', `Bearer ${response.body.refreshToken}`)
        .send({
          shortName: 'gat',
          teamName: 'getafe',
        });
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('message');
      expect(res.body).toHaveProperty('status');
      expect(res.body.status).toBe(201);
      expect(res.body.message).toBe('Team successfully added');
    });

    it('CREATE TEAM VALIDATION NO DATA', async () => {
      const response = await request(app)
        .post(signinRoute)
        .send({
          email: 'cavdy@cavdy.com',
          password
        });
      const res = await request(app)
        .post(teamRoute)
        .set('Authorization', `Bearer ${response.body.refreshToken}`)
        .send({
          shortName: '',
          teamName: '',
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

    it('CREATE TEAM VALIDATION WRONG DATA', async () => {
      const response = await request(app)
        .post(signinRoute)
        .send({
          email: 'cavdy@cavdy.com',
          password
        });
      const res = await request(app)
        .post(teamRoute)
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

    it('CREATE TEAM VALIDATION SHORT NAME EXIST', async () => {
      const response = await request(app)
        .post(signinRoute)
        .send({
          email: 'cavdy@cavdy.com',
          password
        });
      const res = await request(app)
        .post(teamRoute)
        .set('Authorization', `Bearer ${response.body.refreshToken}`)
        .send({
          shortName: 'gat',
          teamName: 'gatafe fc',
        });
      expect(res.statusCode).toEqual(409);
      expect(res.body).toHaveProperty('message');
      expect(res.body).toHaveProperty('status');
      expect(res.body).toHaveProperty('data');
      expect(res.body.data).toHaveProperty('shortName');
      expect(res.body.status).toBe(409);
      expect(res.body.message).toBe('Team error');
      expect(res.body.data.shortName)
        .toBe('Short Name already exist');
    });

    it('CREATE TEAM VALIDATION TEAM NAME EXIST', async () => {
      const response = await request(app)
        .post(signinRoute)
        .send({
          email: 'cavdy@cavdy.com',
          password
        });
      const res = await request(app)
        .post(teamRoute)
        .set('Authorization', `Bearer ${response.body.refreshToken}`)
        .send({
          shortName: 'gate',
          teamName: 'getafe',
        });
      expect(res.statusCode).toEqual(409);
      expect(res.body).toHaveProperty('message');
      expect(res.body).toHaveProperty('status');
      expect(res.body).toHaveProperty('data');
      expect(res.body.data).toHaveProperty('teamName');
      expect(res.body.status).toBe(409);
      expect(res.body.message).toBe('Team error');
      expect(res.body.data.teamName)
        .toBe('Team Name already exist');
    });
  });
});
