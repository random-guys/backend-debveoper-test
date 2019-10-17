/* eslint-disable camelcase */
import request from 'supertest';
import app from '../index';

import User from '../models/users.model';
import Team from '../models/teams.model';
import TestDbHelper from '../../testDB';

const dbHelper = new TestDbHelper();
let adminToken;
let userToken;
let team_id;
let team_id2;
let team_id3;

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
  const team1 = await new Team({
    team_name: 'Liverpool FC',
    location: 'Liverpool',
    year_founded: 1862,
    current_manager: 'Jurgen Klopp',
    major_trophies: 26,
    stadium: 'Anfield',
    motto: 'You will never walk alone',
  }).save();
  const team2 = await new Team({
    team_name: 'Manchester United',
    location: 'Manchester',
    year_founded: 1892,
    stadium: 'Old Trafford',
    current_manager: 'Ole Gunnar Solksjaer',
    major_trophies: 26,
    motto: 'Red Devils',
  }).save();
  const team3 = await new Team({
    team_name: 'Chelsea',
    location: 'London',
    year_founded: 1899,
    stadium: 'Stanford Bridge',
    current_manager: 'Frank Lampard',
    major_trophies: 16,
    motto: 'The Blues',
  }).save();
  const team4 = await new Team({
    team_name: 'Arsenal',
    location: 'London',
    year_founded: 1899,
    stadium: 'Emirates Stadium',
    current_manager: 'Unai Emery',
    major_trophies: 20,
    motto: 'The Guners',
  }).save();
  return {
    user1, user2, team1, team2, team3, team4,
  };
}

beforeAll(async () => {
  await dbHelper.start();
  const {
    user1, user2, team1, team2, team3, team4,
  } = await createSamples();
  team_id = team1.id;
  team_id2 = team2.id;
  team_id3 = team3.id;
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

describe('All team management', () => {
  describe('POST /add team', () => {
    test('It responds with the newly added team', async () => {
      const response = await request(app)
        .post('/api/v1/teams/add')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          team_name: 'Wigan Athletic',
          motto: 'Toffee Blues',
          major_trophies: '12',
          location: 'Wigan',
          stadium: 'Madison Park',
          year_founded: '1826',
          current_manager: 'Roberto Martinez',
        });
      // Ensure the results returned is correct
      expect(response.statusCode).toBe(200);
      expect(response.body.data).toHaveProperty('id');
      expect(response.body.data).toHaveProperty('team_name');
      expect(response.body.data).toHaveProperty('motto');
      expect(response.body.data).toHaveProperty('location');
      expect(response.body.data).toHaveProperty('major_trophies');
      expect(response.body.data).toHaveProperty('year_founded');
      expect(response.body.data).toHaveProperty('current_manager');
    });

    test('It throws an error on duplicate team name', async () => {
      const response = await request(app)
        .post('/api/v1/teams/add')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          team_name: 'Wigan Athletic',
          motto: 'Toffee Blues',
          major_trophies: '12',
          location: 'Wigan',
          stadium: 'Madison Park',
          year_founded: '1826',
          current_manager: 'Roberto Martinez',
        });
      // Ensure the results returned is correct
      expect(response.statusCode).toBe(400);
      expect(response.body.error).toBe('Team name is already registered');
    });

    test('It throws an error on missing team name', async () => {
      const response = await request(app)
        .post('/api/v1/teams/add')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          motto: 'Toffee Blues',
          major_trophies: '12',
          location: 'Wigan',
          stadium: 'Madison Park',
          year_founded: '1826',
          current_manager: 'Roberto Martinez',
        });
      // Ensure the results returned is correct
      expect(response.statusCode).toBe(400);
      expect(response.body.error).toBe('team_name is required');
    });

    test('It throws an error on missing motto', async () => {
      const response = await request(app)
        .post('/api/v1/teams/add')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          team_name: 'Wigan Athletic',
          major_trophies: '12',
          location: 'Wigan',
          year_founded: '1826',
          stadium: 'Madison Park',
          current_manager: 'Roberto Martinez',
        });
      // Ensure the results returned is correct
      expect(response.statusCode).toBe(400);
      expect(response.body.error).toBe('motto is required');
    });

    test('It throws an error on missing major trophies', async () => {
      const response = await request(app)
        .post('/api/v1/teams/add')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          team_name: 'Wigan Athletic',
          motto: 'Toffee Blues',
          location: 'Wigan',
          stadium: 'Madison Park',
          year_founded: '1826',
          current_manager: 'Roberto Martinez',
        });
      // Ensure the results returned is correct
      expect(response.statusCode).toBe(400);
      expect(response.body.error).toBe('major_trophies is required');
    });

    test('It throws an error on missing location', async () => {
      const response = await request(app)
        .post('/api/v1/teams/add')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          team_name: 'Wigan Athletic',
          motto: 'Toffee Blues',
          major_trophies: '12',
          year_founded: '1826',
          stadium: 'Madison Park',
          current_manager: 'Roberto Martinez',
        });
      // Ensure the results returned is correct
      expect(response.statusCode).toBe(400);
      expect(response.body.error).toBe('location is required');
    });
    test('It throws an error on missing year founded', async () => {
      const response = await request(app)
        .post('/api/v1/teams/add')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          team_name: 'Wigan Athletic',
          motto: 'Toffee Blues',
          major_trophies: '12',
          location: 'Wigan',
          stadium: 'Madison Park',
          current_manager: 'Roberto Martinez',
        });
      // Ensure the results returned is correct
      expect(response.statusCode).toBe(400);
      expect(response.body.error).toBe('year_founded is required');
    });
    test('It throws an error on missing current manager', async () => {
      const response = await request(app)
        .post('/api/v1/teams/add')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          team_name: 'Wigan Athletic',
          motto: 'Toffee Blues',
          major_trophies: '12',
          location: 'Wigan',
          stadium: 'Madison Park',
          year_founded: '1826',
        });
      // Ensure the results returned is correct
      expect(response.statusCode).toBe(400);
      expect(response.body.error).toBe('current_manager is required');
    });
    test('It throws an error on missing stadium', async () => {
      const response = await request(app)
        .post('/api/v1/teams/add')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          team_name: 'Wigan Athletic',
          motto: 'Toffee Blues',
          major_trophies: '12',
          location: 'Wigan',
          year_founded: '1826',
          current_manager: 'Roberto Martinez',
        });
      // Ensure the results returned is correct
      expect(response.statusCode).toBe(400);
      expect(response.body.error).toBe('stadium is required');
    });

    test('It throws a 401 on admin privileges', async () => {
      const response = await request(app)
        .post('/api/v1/teams/add')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          team_name: 'Wigan Athletic',
          motto: 'Toffee Blues',
          major_trophies: '12',
          location: 'Wigan',
          stadium: 'Madison Park',
          year_founded: '1826',
          current_manager: 'Roberto Martinez',
        });
      // Ensure the results returned is correct
      expect(response.statusCode).toBe(401);
      expect(response.body.error).toBe('Authorized for only admins');
    });
  });

  describe('Get team', () => {
    test('It responds with all the teams', async () => {
      const response = await request(app).get('/api/v1/teams');
      // Ensure the results returned is correct
      expect(response.statusCode).toBe(200);
      expect(typeof response.body.data).toBe('object');
    });
    test('It responds with a particular team', async () => {
      const response = await request(app).get(`/api/v1/teams/${team_id}`);
      // Ensure the results returned is correct
      expect(response.statusCode).toBe(200);
      expect(typeof response.body.data).toBe('object');
    });
    test('It throws error on invalid id', async () => {
      const response = await request(app)
        .get('/api/v1/teams/.*((#')
        .set('Authorization', `Bearer ${adminToken}`);
      // Ensure the results returned is correct
      expect(response.statusCode).toBe(400);
      expect(response.body.error).toBe('team_id is not valid');
    });
    test('It throws error on invalid id', async () => {
      const response = await request(app)
        .get('/api/v1/teams/jesus*%$')
        .set('Authorization', `Bearer ${userToken}`);
      // Ensure the results returned is correct
      expect(response.statusCode).toBe(400);
      expect(response.body.error).toBe('Failed to decode param: /api/v1/teams/jesus*%$');
    });
  });

  describe('Delete team', () => {
    test('It responds with the deleted team', async () => {
      const response = await request(app)
        .delete(`/api/v1/teams/${team_id}`)
        .set('Authorization', `Bearer ${adminToken}`);
      // Ensure the results returned is correct
      expect(response.statusCode).toBe(200);
      expect(response.body.message).toBe('Team successfully deleted');
      expect(response.body.data).toHaveProperty('_id');
      expect(response.body.data).toHaveProperty('team_name');
      expect(response.body.data).toHaveProperty('motto');
      expect(response.body.data).toHaveProperty('location');
      expect(response.body.data).toHaveProperty('major_trophies');
      expect(response.body.data).toHaveProperty('year_founded');
      expect(response.body.data).toHaveProperty('current_manager');
    });

    test('It throws a 404', async () => {
      const response = await request(app)
        .delete(`/api/v1/teams/${team_id}`)
        .set('Authorization', `Bearer ${adminToken}`);
      // Ensure the results returned is correct
      expect(response.statusCode).toBe(404);
      expect(response.body.error).toBe('This team does not exist');
    });
    test('It throws error on bad ID', async () => {
      const response = await request(app)
        .delete('/api/v1/teams/jesus.$%%^^&&')
        .set('Authorization', `Bearer ${adminToken}`);
      // Ensure the results returned is correct
      expect(response.statusCode).toBe(400);
    });
    test('It throws error on admin privileges', async () => {
      const response = await request(app)
        .delete('/api/v1/teams/1')
        .set('Authorization', `Bearer ${userToken}`);
      // Ensure the results returned is correct
      expect(response.statusCode).toBe(401);
      expect(response.body.error).toBe('Authorized for only admins');
    });
  });

  describe('Edit team', () => {
    test('It responds with the edited team', async () => {
      const response = await request(app)
        .put(`/api/v1/teams/edit/${team_id2}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          team_name: 'Wigan Athletic',
          motto: 'Toffee Blues',
          major_trophies: '12',
          location: 'Wigan',
          stadium: 'Madison Park',
          year_founded: '1826',
          current_manager: 'Roberto Martinez',
        });
      // Ensure the results returned is correct
      expect(response.statusCode).toBe(200);
      expect(response.body.message).toBe('Team successfully edited');
      expect(response.body.data).toHaveProperty('_id');
      expect(response.body.data).toHaveProperty('team_name');
      expect(response.body.data).toHaveProperty('motto');
      expect(response.body.data).toHaveProperty('location');
      expect(response.body.data).toHaveProperty('major_trophies');
      expect(response.body.data).toHaveProperty('year_founded');
      expect(response.body.data).toHaveProperty('current_manager');
    });
    test('It throws error on admin privileges', async () => {
      const response = await request(app)
        .put('/api/v1/teams/edit/3')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          team_name: 'Wigan Athletic',
          motto: 'Toffee Blues',
          major_trophies: '12',
          location: 'Wigan',
          year_founded: '1826',
          stadium: 'Madison Park',
          current_manager: 'Roberto Martinez',
        });
      // Ensure the results returned is correct
      expect(response.statusCode).toBe(401);
      expect(response.body.error).toBe('Authorized for only admins');
    });
    test('It throws error on team not found', async () => {
      const response = await request(app)
        .put('/api/v1/teams/edit/5bf142459b72e12b2b1b2cd')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          team_name: 'Wigan Athletic',
          motto: 'Toffee Blues',
          major_trophies: '12',
          location: 'Wigan',
          year_founded: '1826',
          stadium: 'Madison Park',
          current_manager: 'Roberto Martinez',
        });
      // Ensure the results returned is correct
      expect(response.statusCode).toBe(400);
      expect(response.body.error).toBe('team_id is not valid');
    });
  });
});
