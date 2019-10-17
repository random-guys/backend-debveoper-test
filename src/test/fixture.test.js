/* eslint-disable camelcase */
import request from 'supertest';
import app from '../index';

import User from '../models/users.model';
import Fixture from '../models/fixtures.model';
import TestDbHelper from '../../testDB';

const dbHelper = new TestDbHelper();
let adminToken;
let userToken;
let fixture_id1;
let fixture_id2;
let fixture_id3;

/**
 * Insert set of sample products into the database
 */
async function createSamples() {
  const user1 = await new User({
    first_name: 'User',
    last_name: 'One',
    email: 'userone@gmail.com',
    password: '$2a$10$17MpQeJWeiXDlMhae/UvkO8I04nB4XOX24FnH0qN9i3VO8r9WFHni',
    is_admin: true,
  }).save();
  const user2 = await new User({
    first_name: 'User',
    last_name: 'Two',
    email: 'usertwo@gmail.com',
    password: '$2a$10$17MpQeJWeiXDlMhae/UvkO8I04nB4XOX24FnH0qN9i3VO8r9WFHni',
    is_admin: false,
  }).save();
  const fixture1 = await new Fixture({
    team_A: 'Liverpool',
    team_B: 'Arsenal',
    venue: 'Anfield',
    date: new Date('2018-08-09'),
    time: '3pm',
    status: 'pending',
    scores: '0-0',
  }).save();
  const fixture2 = await new Fixture({
    team_A: 'Manchester United',
    team_B: 'Chelsea',
    venue: 'Old Trafford',
    date: new Date('2018-06-09'),
    time: '3pm',
    status: 'completed',
    scores: '2-1',
  }).save();
  const fixture3 = await new Fixture({
    team_A: 'Leicester City',
    team_B: 'Wigan Athletic',
    venue: 'King Power Stadium',
    date: new Date('2018-08-09'),
    time: '3pm',
    status: 'pending',
    scores: '0-0',
  }).save();
  return {
    user1, user2, fixture1, fixture2, fixture3,
  };
}

beforeAll(async () => {
  await dbHelper.start();
  const {
    user1, user2, fixture1, fixture2, fixture3,
  } = await createSamples();
  fixture_id1 = fixture1.id;
  fixture_id2 = fixture2.id;
  fixture_id3 = fixture3.id;
  const adminTokenResponse = await request(app)
    .post('/api/v1/users/signin')
    .send({
      email: 'userone@gmail.com',
      password: 'johnbaby',
    });
  adminToken = adminTokenResponse.body.data.token; // save the token!
  const userTokenResponse = await request(app)
    .post('/api/v1/users/signin')
    .send({
      email: 'usertwo@gmail.com',
      password: 'johnbaby',
    });
  userToken = userTokenResponse.body.data.token; // save the token!
});

afterAll(async () => {
  await dbHelper.stop();
});

describe('All fixture management', () => {
  describe('POST /add fixture', () => {
    test('It responds with the newly added fixture', async () => {
      const response = await request(app)
        .post('/api/v1/fixtures/create')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          team_A: 'Wigan Athletic',
          team_B: 'Birmingham Athletic',
          date: '12-06-2019',
          time: '4pm',
          venue: 'Wigan Park',
          status: 'pending',
        });
      // Ensure the results returned is correct
      expect(response.statusCode).toBe(200);
      expect(response.body.data).toHaveProperty('id');
      expect(response.body.data).toHaveProperty('team_A');
      expect(response.body.data).toHaveProperty('team_B');
      expect(response.body.data).toHaveProperty('date');
      expect(response.body.data).toHaveProperty('time');
    });

    test('It throws an error on duplicate fixture', async () => {
      const response = await request(app)
        .post('/api/v1/fixtures/create')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          team_A: 'Wigan Athletic',
          team_B: 'Birmingham Athletic',
          date: '12-06-2019',
          time: '4pm',
          venue: 'Wigan Park',
          status: 'pending',
        });
      // Ensure the results returned is correct
      expect(response.statusCode).toBe(400);
      expect(response.body.error).toBe('There is already a scheduled fixture between the teams on that date');
    });

    test('It throws an error on missing team name', async () => {
      const response = await request(app)
        .post('/api/v1/fixtures/create')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          team_B: 'Birmingham Athletic',
          date: '12-06-2019',
          time: '4pm',
          venue: 'Wigan Park',
          status: 'pending',
        });
      // Ensure the results returned is correct
      expect(response.statusCode).toBe(400);
      expect(response.body.error).toBe('team_A is required');
    });

    test('It throws an error on missing team name', async () => {
      const response = await request(app)
        .post('/api/v1/fixtures/create')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          team_A: 'Wigan Athletic',
          date: '12-06-2019',
          time: '4pm',
          venue: 'Wigan Park',
          status: 'pending',
        });
      // Ensure the results returned is correct
      expect(response.statusCode).toBe(400);
      expect(response.body.error).toBe('team_B is required');
    });

    test('It throws an error on missing date', async () => {
      const response = await request(app)
        .post('/api/v1/fixtures/create')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          team_A: 'Wigan Athletic',
          team_B: 'Birmingham Athletic',
          time: '4pm',
          venue: 'Wigan Park',
          status: 'pending',
        });
      // Ensure the results returned is correct
      expect(response.statusCode).toBe(400);
      expect(response.body.error).toBe('date is required');
    });

    test('It throws an error on invalid date', async () => {
      const response = await request(app)
        .post('/api/v1/fixtures/create')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          team_A: 'Wigan Athletic',
          team_B: 'Birmingham Athletic',
          date: 'string',
          time: '4pm',
          venue: 'Wigan Park',
          status: 'pending',
        });
      // Ensure the results returned is correct
      expect(response.statusCode).toBe(400);
      expect(response.body.error).toBe('date must be a number of milliseconds or valid date string');
    });

    test('It throws an error on missing time', async () => {
      const response = await request(app)
        .post('/api/v1/fixtures/create')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          team_A: 'Wigan Athletic',
          team_B: 'Birmingham Athletic',
          date: '12-06-2019',
          venue: 'Wigan Park',
          status: 'pending',
        });
      // Ensure the results returned is correct
      expect(response.statusCode).toBe(400);
      expect(response.body.error).toBe('time is required');
    });
    test('It throws an error on missing venue', async () => {
      const response = await request(app)
        .post('/api/v1/fixtures/create')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          team_A: 'Wigan Athletic',
          team_B: 'Birmingham Athletic',
          date: '12-06-2019',
          time: '4pm',
          status: 'pending',
        });
      // Ensure the results returned is correct
      expect(response.statusCode).toBe(400);
      expect(response.body.error).toBe('venue is required');
    });
    test('It throws an error on missing status', async () => {
      const response = await request(app)
        .post('/api/v1/fixtures/create')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          team_A: 'Wigan Athletic',
          team_B: 'Birmingham Athletic',
          date: '12-06-2019',
          time: '4pm',
          venue: 'Wigan Park',
        });
      // Ensure the results returned is correct
      expect(response.statusCode).toBe(400);
      expect(response.body.error).toBe('status is required');
    });
    test('It throws an error on invalid status type', async () => {
      const response = await request(app)
        .post('/api/v1/fixtures/create')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          team_A: 'Wigan Athletic',
          team_B: 'Birmingham Athletic',
          date: '12-06-2019',
          time: '4pm',
          venue: 'Wigan Park',
          status: 'not yet',
        });
      // Ensure the results returned is correct
      expect(response.statusCode).toBe(400);
      expect(response.body.error).toBe('status must be one of [pending, completed]');
    });

    test('It throws a 401 on admin privileges', async () => {
      const response = await request(app)
        .post('/api/v1/fixtures/create')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          team_A: 'Wigan Athletic',
          team_B: 'Birmingham Athletic',
          date: '12-06-2019',
          time: '4pm',
          venue: 'Wigan Park',
          status: 'pending',
        });
      // Ensure the results returned is correct
      expect(response.statusCode).toBe(401);
      expect(response.body.error).toBe('Authorized for only admins');
    });
  });

  describe('Delete fixture', () => {
    test('It responds with the deleted fixture', async () => {
      const response = await request(app)
        .delete(`/api/v1/fixtures/${fixture_id1}`)
        .set('Authorization', `Bearer ${adminToken}`);
      // Ensure the results returned is correct
      expect(response.statusCode).toBe(200);
      expect(response.body.message).toBe('Fixture successfully deleted');
      expect(response.body.data).toHaveProperty('_id');
      expect(response.body.data).toHaveProperty('team_A');
      expect(response.body.data).toHaveProperty('team_B');
      expect(response.body.data).toHaveProperty('date');
      expect(response.body.data).toHaveProperty('time');
      expect(response.body.data).toHaveProperty('venue');
      expect(response.body.data).toHaveProperty('scores');
    });
    test('It throws a 404 error', async () => {
      const response = await request(app)
        .delete(`/api/v1/fixtures/${fixture_id1}`)
        .set('Authorization', `Bearer ${adminToken}`);
      // Ensure the results returned is correct
      expect(response.statusCode).toBe(404);
      expect(response.body.error).toBe('This fixture does not exist');
    });

    test('It throws error on bad ID', async () => {
      const response = await request(app)
        .delete('/api/v1/fixtures/jesus.#@@(')
        .set('Authorization', `Bearer ${adminToken}`);
      // Ensure the results returned is correct
      expect(response.statusCode).toBe(400);
    });
    test('It throws error on admin privileges', async () => {
      const response = await request(app)
        .delete('/api/v1/fixtures/1')
        .set('Authorization', `Bearer ${userToken}`);
      // Ensure the results returned is correct
      expect(response.statusCode).toBe(401);
      expect(response.body.error).toBe('Authorized for only admins');
    });
  });

  describe('Get fixture', () => {
    test('It responds with all the fixtures', async () => {
      const response = await request(app).get('/api/v1/fixtures');
      // Ensure the results returned is correct
      expect(response.statusCode).toBe(200);
      expect(typeof response.body.data).toBe('object');
    });
    test('It responds with all the pending fixtures', async () => {
      const response = await request(app).get('/api/v1/fixtures/?status=pending');
      // Ensure the results returned is correct
      expect(response.statusCode).toBe(200);
      expect(typeof response.body.data).toBe('object');
    });
    test('It responds with all the completed fixtures', async () => {
      const response = await request(app).get('/api/v1/fixtures/?status=completed');
      // Ensure the results returned is correct
      expect(response.statusCode).toBe(200);
      expect(typeof response.body.data).toBe('object');
    });
    test('It throws error on bad status argument', async () => {
      const response = await request(app).get('/api/v1/fixtures/?status=completion');
      // Ensure the results returned is correct
      expect(response.statusCode).toBe(400);
      expect(response.body.error).toBe('No completion fixtures');
    });
    test('It responds with a particular fixture', async () => {
      const response = await request(app)
        .get(`/api/v1/fixtures/${fixture_id2}`);
      // Ensure the results returned is correct
      expect(response.statusCode).toBe(200);
      expect(typeof response.body.data).toBe('object');
    });
    test('It throws error on invalid id', async () => {
      const response = await request(app)
        .get('/api/v1/fixtures/1234sf')
        .set('Authorization', `Bearer ${adminToken}`);
      // Ensure the results returned is correct
      expect(response.statusCode).toBe(400);
      expect(response.body.error).toBe('fixture_id is not valid');
    });
    test('It throws error on invalid id', async () => {
      const response = await request(app)
        .get('/api/v1/fixtures/jesus.**(((*&&^%$')
        .set('Authorization', `Bearer ${userToken}`);
      // Ensure the results returned is correct
      expect(response.statusCode).toBe(400);
      expect(response.body.error).toBe('Failed to decode param: /api/v1/fixtures/jesus.**(((*&&%5E%$');
    });
  });

  describe('Edit fixtures', () => {
    test('It responds with the edited fixtures', async () => {
      const response = await request(app)
        .put(`/api/v1/fixtures/edit/${fixture_id2}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          team_A: 'Wigan Athletic',
          team_B: 'Birmingham Athletic',
          date: '2018-12-30',
          time: '4pm',
          venue: 'Wigan Park',
        });
      // Ensure the results returned is correct
      expect(response.statusCode).toBe(200);
      expect(response.body.message).toBe('Fixture successfully edited');
      expect(response.body.data).toHaveProperty('_id');
      expect(response.body.data).toHaveProperty('team_A');
      expect(response.body.data).toHaveProperty('team_B');
      expect(response.body.data).toHaveProperty('date');
      expect(response.body.data).toHaveProperty('time');
      expect(response.body.data).toHaveProperty('venue');
      expect(response.body.data).toHaveProperty('scores');
    });
    test('It throws error on admin privileges', async () => {
      const response = await request(app)
        .put('/api/v1/teams/edit/3')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          team_A: 'Wigan Athletic',
          team_B: 'Birmingham Athletic',
          date: '12-06-2019',
          time: '4pm',
          venue: 'Wigan Park',
        });
      // Ensure the results returned is correct
      expect(response.statusCode).toBe(401);
      expect(response.body.error).toBe('Authorized for only admins');
    });
    test('It throws error on fixture not found', async () => {
      const response = await request(app)
        .put('/api/v1/fixtures/edit/5bf142459b72e12b2b1b2cd')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          team_A: 'Wigan Athletic',
          team_B: 'Birmingham Athletic',
          date: '12-06-2019',
          time: '4pm',
          venue: 'Wigan Park',
        });
      // Ensure the results returned is correct
      expect(response.statusCode).toBe(400);
      expect(response.body.error).toBe('fixture_id is not valid');
    });
  });
});
