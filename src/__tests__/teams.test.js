/* eslint-disable linebreak-style */
import request from 'supertest';
import dotenv from 'dotenv';
import database from '../models/Db/index';
import app from '../app';

dotenv.config();
let client;
let db;
let users;
let teams;
const token = process.env.TEST_AUTH_TOKEN;

beforeAll(async () => {
  try {
    client = await database;
    db = client.db();
    users = db.collection('testUsers');
    teams = db.collection('testTeams');
  } catch (error) {
    console.log(error);
  }
});

afterAll(async () => {
  try {
    await client.close();
  } catch (error) {
    console.log(error);
  }
});
describe('POST /api/v1/admin/team', () => {
  describe('When the request body parameters are in the proper format', () => {
    test('It responds with the newly created team', async () => {
      const newTeam = await request(app)
        .post('/api/v1/admin/team')
        .set('Authorization', `Bearer ${token}`)
        .send({
          teamName: 'aston villa',
          numOfPlayers: 10,
        })
        .catch((err) => console.log(err));
      expect(newTeam.body).toHaveProperty('data');
      expect(newTeam.body.data).toHaveProperty('_id');
      expect(newTeam.body.data).toHaveProperty('name');
      expect(newTeam.body.data).toHaveProperty('players');
      expect(newTeam.body.data.name).toBe('aston villa');
      expect(newTeam.body.data.players).toBe(10);
    });
  });
  afterAll(async () => {
    try {
      await teams.findOneAndDelete({ name: 'aston villa' });
    } catch (error) {
      console.log(error);
    }
  });
});

describe('GET /api/v1/admin/team', () => {
  describe('When the request body parameters are in the proper format', () => {
    test('It responds with an array of all the teams', async () => {
      const team = await request(app)
        .get('/api/v1/admin/team')
        .set('Authorization', `Bearer ${token}`)
        .catch((err) => console.log(err));
      expect(team.body).toHaveProperty('data');
      expect(Array.isArray(team.body.data)).toBe(true);
    });
  });
});

describe('GET /api/v1/admin/team/:teamName', () => {
  describe('When the request body parameters are in the proper format', () => {
    test('It responds with details of the team of all the teams', async () => {
      const team = await request(app)
        .get('/api/v1/admin/team/liverpool')
        .set('Authorization', `Bearer ${token}`)
        .catch((err) => console.log(err));
      expect(team.body).toHaveProperty('data');
      expect(team.body.data).toHaveProperty('name');
      expect(team.body.data.name).toBe('liverpool');
    });
  });
});

describe('DELETE /api/v1/admin/team/:teamName', () => {
  describe('When the request body parameters are in the proper format', () => {
    test('It responds with details of the team of all the teams', async () => {
      const newTeam = await request(app)
        .post('/api/v1/admin/team')
        .set('Authorization', `Bearer ${token}`)
        .send({
          teamName: 'aston villa',
          numOfPlayers: 10,
        })
        .catch((err) => console.log(err));
      const deletedTeam = await request(app)
      // In the query string a space is represented by +; in the path it is represented by %20
        .delete('/api/v1/admin/team/aston%20villa')
        .set('Authorization', `Bearer ${token}`)
        .catch((err) => console.log(err));
      expect(newTeam.body).toHaveProperty('data');
      expect(newTeam.body.data).toHaveProperty('_id');
      expect(newTeam.body.data).toHaveProperty('name');
      expect(newTeam.body.data).toHaveProperty('players');
      expect(newTeam.body.data.name).toBe('aston villa');
      expect(newTeam.body.data.players).toBe(10);
      expect(deletedTeam.body).toHaveProperty('data');
      expect(deletedTeam.body.data).toHaveProperty('name');
      expect(deletedTeam.body.data.name).toBe('aston villa');
    });
  });
});

describe('PATCH /api/v1/admin/team/:teamName/players', () => {
  describe('When the request body parameters are in the proper format', () => {
    test('It responds with details of the team of all the teams', async () => {
      const newTeam = await request(app)
        .post('/api/v1/admin/team')
        .set('Authorization', `Bearer ${token}`)
        .send({
          teamName: 'aston villa',
          numOfPlayers: 12,
        })
        .catch((err) => console.log(err));
      const editedTeam = await request(app)
        .patch('/api/v1/admin/team/aston%20villa/players')
        .send({ numOfPlayers: 15 })
        .set('Authorization', `Bearer ${token}`)
        .catch((err) => console.log(err));
      expect(newTeam.body).toHaveProperty('data');
      expect(newTeam.body.data).toHaveProperty('_id');
      expect(newTeam.body.data).toHaveProperty('name');
      expect(newTeam.body.data).toHaveProperty('players');
      expect(newTeam.body.data.name).toBe('aston villa');
      expect(newTeam.body.data.players).toBe(12);
      expect(editedTeam.body).toHaveProperty('data');
      expect(editedTeam.body.data).toHaveProperty('name');
      expect(editedTeam.body.data.players).toBe(15);
    });
  });
  afterAll(async () => {
    try {
      await teams.findOneAndDelete({ name: 'aston villa' });
    } catch (error) {
      console.log(error);
    }
  });
});
