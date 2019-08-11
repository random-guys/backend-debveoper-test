/* eslint-disable linebreak-style */
import request from 'supertest';
import dotenv from 'dotenv';
import database from '../models/Db/index';
import app from '../app';

dotenv.config();
let client;
let db;
let users;

beforeAll(async () => {
  try {
    client = await database;
    db = client.db();
    users = db.collection('testUsers');
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
describe('POST /api/auth/signup/user', () => {
  describe('When the request body parameters are in the proper format', () => {
    test('It responds with the newly created user', async () => {
      const newUser = await request(app)
        .post('/api/auth/signup/user')
        .send({
          firstName: 'James',
          lastName: 'Doe',
          email: 'jamesdomkkk@test.com',
          password: '123456',
        }).catch((err) => console.log(err));
      expect(newUser.body).toHaveProperty('data');
      expect(newUser.body.data).toHaveProperty('_id');
      expect(newUser.body.data).toHaveProperty('firstName');
      expect(newUser.body.data).toHaveProperty('lastName');
      expect(newUser.body.data).toHaveProperty('email');
      expect(newUser.body.data).toHaveProperty('isAdmin');
      expect(newUser.body.data.isAdmin).toBe(false);
    });
  });
  afterAll(async () => {
    await db.dropCollection('testUsers');
  });
});
