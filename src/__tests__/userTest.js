/* eslint-disable no-console */
/* eslint-disable linebreak-style */
import request from 'supertest';
import dotenv from 'dotenv';
import server from '../server';
import client from '../db/db';

dotenv.config();
const opendb = () => new Promise((resolve, reject) => {
  client
    .then((data) => {
      data.db('danielchima').collection('test1');
      resolve(data);
    }).catch(err => reject(err));
});


const closedb = () => new Promise((resolve, reject) => {
  client
    .then((data) => {
      data.close();
      resolve(data);
    }).catch(err => reject(err));
});

const dropdb = () => new Promise((resolve, reject) => {
  client
    .then((data) => {
      data.db('danielchima').collection('test1').drop()
        .then(result => resolve(result));
    }).catch(err => reject(err));
});

beforeAll(async () => {
  try { await opendb(); } catch (error) { console.log(error); }
});

afterAll(async () => {
  try { await closedb(); } catch (error) { console.log(error); }
});


/* TEST CASES FOR USER */
describe('USER TESTS /auth/', () => {
  test('POST: returns new user data', async () => {
    const user = await request(server)
      .post('/api/v1/auth/signup')
      .send({
        email: 'jeny@yahoo.com',
        first_name: 'Jeni',
        last_name: 'Mani',
        password: 'felixer11',
      }).catch(err => console.log(err));
    expect(user.body).toHaveProperty('data');
    expect(user.body.data).toHaveProperty('_id');
    expect(user.body.data).toHaveProperty('email');
    expect(user.body).toHaveProperty('status');
    expect(user.body.status).toBe(200);
  });

  test('ERR: returns error when user exists', async () => {
    const user = await request(server)
      .post('/api/v1/auth/signup')
      .send({
        email: 'jeny@yahoo.com',
        first_name: 'Jeni',
        last_name: 'Mani',
        password: 'felixer11',
      }).catch(err => console.log(err));
    expect(user.body).toHaveProperty('error');
    expect(user.body.error).toBe('User exists');
    expect(user.body).toHaveProperty('status');
    expect(user.body.status).toBe(400);
  });

  test('POST: returns logged in user data', async () => {
    const user = await request(server)
      .post('/api/v1/auth/signin')
      .send({
        email: 'jeny@yahoo.com',
        password: 'felixer11',
      }).catch(err => console.log(err));
    expect(user.body).toHaveProperty('data');
    expect(user.body.data).toHaveProperty('_id');
    expect(user.body.data).toHaveProperty('email');
    expect(user.body.data).toHaveProperty('token');
    expect(user.body).toHaveProperty('status');
    expect(user.body.status).toBe(200);
  });

  test('ERR: returns error with missing parameters', async () => {
    const user = await request(server)
      .post('/api/v1/auth/signin')
      .send({
        email: 'jeny@yahoo.com',
      }).catch(err => console.log(err));
    expect(user.body).toHaveProperty('error');
    expect(user.body).toHaveProperty('status');
    expect(user.body.status).toBe(400);
  });
  afterAll(async () => {
    try { await dropdb(); } catch (error) { console.log(error); }
  });
});
