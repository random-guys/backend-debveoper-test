import request from 'supertest';
import app from '../api';
import config from '../api/config/config';

const { password } = config;

describe('FIXTURE', () => {
  describe('FIXTURE TEST', () => {
    const fixtureRoute = '/api/v1/fixture/edit';
    const createFixtureRoute = '/api/v1/fixture/create';
    const signinRoute = '/api/v1/auth/signin';
    it('EDIT FIXTURES', async () => {
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
        .patch(`${fixtureRoute}/${res.body.data._id}`)
        .set('Authorization', `Bearer ${response.body.refreshToken}`)
        .send({
          home: 'chelsea',
          away: ''
        });
      expect(res2.statusCode).toEqual(200);
      expect(res2.body).toHaveProperty('message');
      expect(res2.body).toHaveProperty('status');
      expect(res2.body.status).toBe(200);
      expect(res2.body.message).toBe('Fixture successfully updated');
    });

    it('EDIT FIXTURES 2', async () => {
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
        .patch(`${fixtureRoute}/${res.body.data._id}`)
        .set('Authorization', `Bearer ${response.body.refreshToken}`)
        .send({
          home: '',
          away: 'manchester united'
        });
      expect(res2.statusCode).toEqual(200);
      expect(res2.body).toHaveProperty('message');
      expect(res2.body).toHaveProperty('status');
      expect(res2.body.status).toBe(200);
      expect(res2.body.message).toBe('Fixture successfully updated');
    });

    it('EDIT FIXTURES WRONG DATA', async () => {
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
        .patch(`${fixtureRoute}/${res.body.data._id}`)
        .set('Authorization', `Bearer ${response.body.refreshToken}`)
        .send({
          home: 'e',
          away: 'e'
        });
      expect(res2.statusCode).toEqual(400);
      expect(res2.body).toHaveProperty('message');
      expect(res2.body).toHaveProperty('status');
      expect(res2.body).toHaveProperty('data');
      expect(res2.body.data).toHaveProperty('home');
      expect(res2.body.data).toHaveProperty('away');
      expect(res2.body.status).toBe(400);
      expect(res2.body.message).toBe('Fields are required');
      expect(res2.body.data.home).toBe('Home Team should be at least 5 and 30 characters long');
      expect(res2.body.data.away).toBe('Away Team should be at least 5 and 30 characters long');
    });

    it('EDIT FIXTURES WRONG DATA 2', async () => {
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
        .patch(`${fixtureRoute}/${res.body.data._id}`)
        .set('Authorization', `Bearer ${response.body.refreshToken}`)
        .send({
          home: 'e44523',
          away: 'e15252'
        });
      expect(res2.statusCode).toEqual(400);
      expect(res2.body).toHaveProperty('message');
      expect(res2.body).toHaveProperty('status');
      expect(res2.body).toHaveProperty('data');
      expect(res2.body.data).toHaveProperty('home');
      expect(res2.body.data).toHaveProperty('away');
      expect(res2.body.status).toBe(400);
      expect(res2.body.message).toBe('Fields are required');
      expect(res2.body.data.home).toBe('Home Team should be an alphabet');
      expect(res2.body.data.away).toBe('Away Team should be an alphabet');
    });
  });
});
