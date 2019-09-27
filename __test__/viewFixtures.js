import request from 'supertest';
import app from '../api';
import config from '../api/config/config';

const { password } = config;

describe('FIXTURE', () => {
  describe('FIXTURE TEST', () => {
    const fixtureRoute = '/api/v1/fixture';
    const createFixtureRoute = '/api/v1/fixture/create';
    const signinRoute = '/api/v1/auth/signin';
    it('ALL FIXTURES', async () => {
      const response = await request(app)
        .post(signinRoute)
        .send({
          email: 'cavdy@cavdy.com',
          password
        });
      const res = await request(app)
        .get(`${fixtureRoute}`)
        .set('Authorization', `Bearer ${response.body.refreshToken}`)
        .send();
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('message');
      expect(res.body).toHaveProperty('status');
      expect(res.body).toHaveProperty('data');
      expect(res.body.status).toBe(200);
      expect(res.body.message).toBe('All Fixtures');
    });

    it('VIEW FIXTURES FIXTURE', async () => {
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
        .get(`${fixtureRoute}/${res.body.data._id}`)
        .set('Authorization', `Bearer ${response.body.refreshToken}`)
        .send();
      expect(res2.statusCode).toEqual(200);
      expect(res2.body).toHaveProperty('message');
      expect(res2.body).toHaveProperty('status');
      expect(res2.body).toHaveProperty('data');
      expect(res2.body.status).toBe(200);
      expect(res2.body.message).toBe('View Specific Fixture');
    });

    it('VIEW FIXTURE', async () => {
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
        .get(`${fixtureRoute}/match/${res.body.data.fixture_link}`)
        .set('Authorization', `Bearer ${response.body.refreshToken}`)
        .send();
      expect(res2.statusCode).toEqual(200);
      expect(res2.body).toHaveProperty('message');
      expect(res2.body).toHaveProperty('status');
      expect(res2.body).toHaveProperty('data');
      expect(res2.body.status).toBe(200);
      expect(res2.body.message).toBe('View Specific Fixture');
    });

    it('VIEW FIXTURE (INVALID)', async () => {
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
        .get(`${fixtureRoute}/match/${res.body.data.fixture_link}43r`)
        .set('Authorization', `Bearer ${response.body.refreshToken}`)
        .send();
      expect(res2.statusCode).toEqual(400);
      expect(res2.body).toHaveProperty('message');
      expect(res2.body).toHaveProperty('status');
      expect(res2.body.status).toBe(400);
      expect(res2.body.message).toBe('Invalid fixture link');
    });

    it('VIEW COMPLETED FIXTURES', async () => {
      const response = await request(app)
        .post(signinRoute)
        .send({
          email: 'cavdy@cavdy.com',
          password
        });
      const res = await request(app)
        .get(`${fixtureRoute}/match/completed`)
        .set('Authorization', `Bearer ${response.body.refreshToken}`)
        .send();
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('message');
      expect(res.body).toHaveProperty('status');
      expect(res.body).toHaveProperty('data');
      expect(res.body.status).toBe(200);
      expect(res.body.message).toBe('All Completed Fixtures');
    });

    it('VIEW PENDING FIXTURES', async () => {
      const response = await request(app)
        .post(signinRoute)
        .send({
          email: 'cavdy@cavdy.com',
          password
        });
      const res = await request(app)
        .get(`${fixtureRoute}/match/pending`)
        .set('Authorization', `Bearer ${response.body.refreshToken}`)
        .send();
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('message');
      expect(res.body).toHaveProperty('status');
      expect(res.body).toHaveProperty('data');
      expect(res.body.status).toBe(200);
      expect(res.body.message).toBe('All Pending Fixtures');
    });
  });
});
