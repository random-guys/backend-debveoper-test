/* eslint-disable no-underscore-dangle */
/* eslint-disable linebreak-style */
import request from 'supertest';
import dotenv from 'dotenv';
import { ObjectID } from 'mongodb';
import database from '../models/Db/index';
import app from '../app';

dotenv.config();
let client;
let db;
let fixtures;
const token = process.env.TEST_AUTH_TOKEN;

beforeAll(async () => {
  try {
    client = await database;
    db = client.db();
    fixtures = db.collection('testFixtures');
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
describe('POST /api/v1/admin/fixture', () => {
  let fixtureId;
  describe('When the request body parameters are in the proper format', () => {
    test('It responds with the newly created fixture', async () => {
      const newFixture = await request(app)
        .post('/api/v1/admin/fixture')
        .set('Authorization', `Bearer ${token}`)
        .send({
          homeTeam: 'brighton',
          awayTeam: 'liverpool',
          dateTime: '2019-08-16 13:00',
        })
        .catch((err) => console.log(err));
      fixtureId = newFixture.body.data._id;
      expect(newFixture.body).toHaveProperty('data');
      expect(newFixture.body.data).toHaveProperty('_id');
      expect(newFixture.body.data).toHaveProperty('homeTeam');
      expect(newFixture.body.data).toHaveProperty('awayTeam');
      expect(newFixture.body.data).toHaveProperty('dateTime');
      expect(new Date(newFixture.body.data.dateTime)).toStrictEqual(new Date('2019-08-16 13:00'));
    });
  });
  afterAll(async () => {
    try {
      await fixtures.findOneAndDelete({ _id: ObjectID(fixtureId) });
    } catch (error) {
      console.log(error);
    }
  });
});

describe('GET /api/v1/admin/fixture', () => {
  describe('When the request body parameters are in the proper format', () => {
    test('It responds with an array of all the fixtures', async () => {
      const fixture = await request(app)
        .get('/api/v1/admin/fixture')
        .set('Authorization', `Bearer ${token}`)
        .catch((err) => console.log(err));
      expect(fixture.body).toHaveProperty('data');
      expect(Array.isArray(fixture.body.data)).toBe(true);
    });
  });
});

describe('GET /api/v1/admin/fixture/:fixtureId', () => {
  describe('When the request body parameters are in the proper format', () => {
    test('It responds with details of the particular fixture', async () => {
      const fixture = await request(app)
        .get('/api/v1/admin/fixture/5d526cac5feb3b21dc085baa')
        .set('Authorization', `Bearer ${token}`)
        .catch((err) => console.log(err));
      expect(fixture.body).toHaveProperty('data');
      expect(fixture.body.data).toHaveProperty('homeTeam');
      expect(fixture.body.data).toHaveProperty('awayTeam');
      expect(fixture.body.data).toHaveProperty('dateTime');
      expect(fixture.body.data._id).toBe('5d526cac5feb3b21dc085baa');
    });
  });
});

describe('DELETE /api/v1/admin/fixture/:fixtureId', () => {
  describe('When the request body parameters are in the proper format', () => {
    test('It responds with details of the deleted fixture', async () => {
      const newFixture = await request(app)
        .post('/api/v1/admin/fixture')
        .set('Authorization', `Bearer ${token}`)
        .send({
          homeTeam: 'manutd',
          awayTeam: 'liverpool',
          dateTime: '2019-08-16 13:00',
        })
        .catch((err) => console.log(err));
      const fixtureId = newFixture.body.data._id;
      const deletedFixture = await request(app)
      // In the query string a space is represented by +; in the path it is represented by %20
        .delete(`/api/v1/admin/fixture/${fixtureId}`)
        .set('Authorization', `Bearer ${token}`)
        .catch((err) => console.log(err));
      expect(newFixture.body).toHaveProperty('data');
      expect(newFixture.body.data).toHaveProperty('_id');
      expect(newFixture.body.data).toHaveProperty('homeTeam');
      expect(newFixture.body.data).toHaveProperty('awayTeam');
      expect(newFixture.body.data).toHaveProperty('dateTime');
      expect(newFixture.body.data._id).toBe(fixtureId);
      expect(deletedFixture.body).toHaveProperty('data');
      expect(deletedFixture.body.data).toHaveProperty('_id');
      expect(deletedFixture.body.data._id).toBe(fixtureId);
    });
  });
});

describe('PATCH /api/v1/admin/fixture/:fixtureId/dateTime', () => {
  let fixtureId;
  describe('When the request body parameters are in the proper format', () => {
    test('It responds with details of the updated fixture time', async () => {
      const newFixture = await request(app)
        .post('/api/v1/admin/fixture')
        .set('Authorization', `Bearer ${token}`)
        .send({
          homeTeam: 'manutd',
          awayTeam: 'liverpool',
          dateTime: '2019-08-16 13:00',
        })
        .catch((err) => console.log(err));
      fixtureId = newFixture.body.data._id;
      const editedFixture = await request(app)
        .patch(`/api/v1/admin/fixture/${fixtureId}/dateTime`)
        .send({ dateTime: '2019-08-16 15:00' })
        .set('Authorization', `Bearer ${token}`)
        .catch((err) => console.log(err));
      expect(newFixture.body).toHaveProperty('data');
      expect(newFixture.body.data).toHaveProperty('_id');
      expect(newFixture.body.data).toHaveProperty('homeTeam');
      expect(newFixture.body.data).toHaveProperty('awayTeam');
      expect(newFixture.body.data).toHaveProperty('dateTime');
      expect(new Date(editedFixture.body.data.dateTime)).toStrictEqual(new Date ('2019-08-16 15:00'));
      expect(editedFixture.body).toHaveProperty('data');
      expect(editedFixture.body.data).toHaveProperty('homeTeam');
      expect(editedFixture.body.data).toHaveProperty('awayTeam');
    });
  });
  afterAll(async () => {
    try {
      await fixtures.findOneAndDelete({ _id: ObjectID(fixtureId) });
    } catch (error) {
      console.log(error);
    }
  });
});

describe('PATCH /api/v1/admin/fixture/:fixtureId/status', () => {
  let fixtureId;
  describe('When the request body parameters are in the proper format', () => {
    test('It responds with details of the updated fixture time', async () => {
      const newFixture = await request(app)
        .post('/api/v1/admin/fixture')
        .set('Authorization', `Bearer ${token}`)
        .send({
          homeTeam: 'manutd',
          awayTeam: 'liverpool',
          dateTime: '2019-08-16 13:00',
        })
        .catch((err) => console.log(err));
      fixtureId = newFixture.body.data._id;
      const editedFixture = await request(app)
        .patch(`/api/v1/admin/fixture/${fixtureId}/status`)
        .send({ status: 'completed' })
        .set('Authorization', `Bearer ${token}`)
        .catch((err) => console.log(err));
      expect(newFixture.body).toHaveProperty('data');
      expect(newFixture.body.data).toHaveProperty('_id');
      expect(newFixture.body.data).toHaveProperty('homeTeam');
      expect(newFixture.body.data).toHaveProperty('awayTeam');
      expect(newFixture.body.data).toHaveProperty('dateTime');
      expect(newFixture.body.data).toHaveProperty('status');
      expect(newFixture.body.data.status).toBe('pending');
      expect(editedFixture.body).toHaveProperty('data');
      expect(editedFixture.body.data).toHaveProperty('homeTeam');
      expect(editedFixture.body.data).toHaveProperty('awayTeam');
      expect(editedFixture.body.data).toHaveProperty('status');
      expect(editedFixture.body.data.status).toBe('completed');

    });
  });
  afterAll(async () => {
    try {
      await fixtures.findOneAndDelete({ _id: ObjectID(fixtureId) });
    } catch (error) {
      console.log(error);
    }
  });
});
