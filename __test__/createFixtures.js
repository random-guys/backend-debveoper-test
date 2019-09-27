import request from 'supertest';
import app from '../api';
import config from '../api/config/config';

const { password } = config;

describe('FIXTURES', () => {
  describe('FIXTURES TEST', () => {
    const fixtureRoute = '/api/v1/fixture/create';
    const signinRoute = '/api/v1/auth/signin';
    it('CREATE FIXTURES', async () => {
      const response = await request(app)
        .post(signinRoute)
        .send({
          email: 'cavdy@cavdy.com',
          password
        });
      const res = await request(app)
        .post(fixtureRoute)
        .set('Authorization', `Bearer ${response.body.refreshToken}`)
        .send({
          home: 'manchester united',
          away: 'chelsea',
        });
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('message');
      expect(res.body).toHaveProperty('data');
      expect(res.body).toHaveProperty('status');
      expect(res.body.status).toBe(201);
      expect(res.body.message).toBe('Fixture Created Successfully');
    });

    it('CREATE FIXTURES VALIDATION NO DATA', async () => {
      const response = await request(app)
        .post(signinRoute)
        .send({
          email: 'cavdy@cavdy.com',
          password
        });
      const res = await request(app)
        .post(fixtureRoute)
        .set('Authorization', `Bearer ${response.body.refreshToken}`)
        .send({
          home: '',
          away: '',
        });
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('message');
      expect(res.body).toHaveProperty('status');
      expect(res.body).toHaveProperty('data');
      expect(res.body.data).toHaveProperty('home');
      expect(res.body.data).toHaveProperty('away');
      expect(res.body.status).toBe(400);
      expect(res.body.message).toBe('Fields are required');
      expect(res.body.data.home)
        .toBe('Home Team should be at least 5 and 30 characters long');
      expect(res.body.data.away)
        .toBe('Away Team should be at least 5 and 30 characters long');
    });

    it('CREATE FIXTURES VALIDATION WRONG DATA', async () => {
      const response = await request(app)
        .post(signinRoute)
        .send({
          email: 'cavdy@cavdy.com',
          password
        });
      const res = await request(app)
        .post(fixtureRoute)
        .set('Authorization', `Bearer ${response.body.refreshToken}`)
        .send({
          home: '72365fsd',
          away: '97fg5ar',
        });
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('message');
      expect(res.body).toHaveProperty('status');
      expect(res.body).toHaveProperty('data');
      expect(res.body.data).toHaveProperty('home');
      expect(res.body.data).toHaveProperty('away');
      expect(res.body.status).toBe(400);
      expect(res.body.message).toBe('Fields are required');
      expect(res.body.data.home)
        .toBe('Home Team should be an alphabet');
      expect(res.body.data.away)
        .toBe('Away Team should be an alphabet');
    });

    it('CREATE FIXTURES VALIDATION SHORT NAME EXIST', async () => {
      const response = await request(app)
        .post(signinRoute)
        .send({
          email: 'cavdy@cavdy.com',
          password
        });
      const res = await request(app)
        .post(fixtureRoute)
        .set('Authorization', `Bearer ${response.body.refreshToken}`)
        .send({
          home: 'gatyio',
          away: 'gatafe fc',
        });
      expect(res.statusCode).toEqual(404);
      expect(res.body).toHaveProperty('message');
      expect(res.body).toHaveProperty('status');
      expect(res.body).toHaveProperty('data');
      expect(res.body.data).toHaveProperty('home');
      expect(res.body.status).toBe(404);
      expect(res.body.message).toBe('Team error');
    });

    it('CREATE FIXTURES VALIDATION SHORT NAME EXIST', async () => {
      const response = await request(app)
        .post(signinRoute)
        .send({
          email: 'cavdy@cavdy.com',
          password
        });
      const res = await request(app)
        .post(fixtureRoute)
        .set('Authorization', `Bearer ${response.body.refreshToken}`)
        .send({
          home: 'chelsea',
          away: 'gatafe fctdu',
        });
      expect(res.statusCode).toEqual(404);
      expect(res.body).toHaveProperty('message');
      expect(res.body).toHaveProperty('status');
      expect(res.body).toHaveProperty('data');
      expect(res.body.data).toHaveProperty('away');
      expect(res.body.status).toBe(404);
      expect(res.body.message).toBe('Team error');
    });
  });
});
