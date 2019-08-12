/* eslint-disable no-console */
/* eslint-disable linebreak-style */
import request from 'supertest';
import server from '../server';
import client from '../db/db';
/*
const opendb = () => new Promise((resolve, reject) => {
  client
    .then((data) => {
      data.db('testbase').collection('users')
        .then(output => resolve(output))
        .catch(err => reject(err));
    });
});

const closedb = () => new Promise((resolve, reject) => {
  client
    .then((data) => {
      data.close()
        .then(output => resolve(output))
        .catch(err => reject(err));
    });
});

beforeAll(async () => {
  try { await opendb(); } catch (error) { console.log(error); }
});

afterAll(async () => {
  try { await closedb(); } catch (error) { console.log(error); }
});
*/
describe('POST /auth/signup', () => {
  test('returns new user data', async () => {
    const user = await request(server)
      .post('api/v1/auth/signup')
      .send({
        email: 'kenny@yahoo.com',
        first_name: 'Felix',
        last_name: 'Mani',
        password: 'felixer11',
      }).catch(err => console.log(err));
    expect(user.body).toHaveProperty('data');
  });
  //afterAll(async () => {
    //await client.db('testbase').dropcollection('users');
  //});
});
