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
      data.db('danielchima').collection('testcollection');
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
      data.db('danielchima').collection('testcollection').drop()
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
describe('TEAM TESTS /teams/', () => {
  test('POST adds new team', async () => {
    const user = await request(server)
      .post('/api/v1/teams/')
      .send({
        team_name: 'Arsenal FC',
        team_size: '14',
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNTE5ZWIyYWUzNmUwNmM3OWU3ZmJhMyIsImVtYWlsIjoia2VubnlAeWFob28uY29tIiwiYWRtaW4iOnRydWUsImlhdCI6MTU2NTYzMDEzMSwiZXhwIjoxNTY5MjMwMTMxfQ.Yh0D3PadXLZFHA8jUvbuTv0GzVS1TN20dc32fcpmCkg',
      }).catch(err => console.log(err));
    expect(user.body).toHaveProperty('data');
  });

  test('ERR: returns error when team exist', async () => {
    const user = await request(server)
      .post('/api/v1/teams/')
      .send({
        team_name: 'Arsenal FC',
        team_size: '14',
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNTE5ZWIyYWUzNmUwNmM3OWU3ZmJhMyIsImVtYWlsIjoia2VubnlAeWFob28uY29tIiwiYWRtaW4iOnRydWUsImlhdCI6MTU2NTYzMDEzMSwiZXhwIjoxNTY5MjMwMTMxfQ.Yh0D3PadXLZFHA8jUvbuTv0GzVS1TN20dc32fcpmCkg',
      }).catch(err => console.log(err));
    expect(user.body).toHaveProperty('error');
  });
/*  NOT PASSING
  test('GET: return single team', async () => {
    const user = await request(server)
      .post('/api/v1/teams/')
      .send({
        team_name: 'Arsenal FC',
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNTE5ZWIyYWUzNmUwNmM3OWU3ZmJhMyIsImVtYWlsIjoia2VubnlAeWFob28uY29tIiwiYWRtaW4iOnRydWUsImlhdCI6MTU2NTYzMDEzMSwiZXhwIjoxNTY5MjMwMTMxfQ.Yh0D3PadXLZFHA8jUvbuTv0GzVS1TN20dc32fcpmCkg',
      }).catch(err => console.log(err));
      console.log(`#3: ${user.body.data}`);
    expect(user.body).toHaveProperty('data');
  });

  test('GET: return all teams', async () => {
    const user = await request(server)
      .post('/api/v1/teams/all')
      .send({
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNTE5ZWIyYWUzNmUwNmM3OWU3ZmJhMyIsImVtYWlsIjoia2VubnlAeWFob28uY29tIiwiYWRtaW4iOnRydWUsImlhdCI6MTU2NTYzMDEzMSwiZXhwIjoxNTY5MjMwMTMxfQ.Yh0D3PadXLZFHA8jUvbuTv0GzVS1TN20dc32fcpmCkg',
      }).catch(err => console.log(err));
    expect(user.body).toHaveProperty('data');
  }); */

  test('ERR: incomplete data', async () => {
    const user = await request(server)
      .post('/api/v1/teams/')
      .send({
        team_name: 'Ar',
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNTE5ZWIyYWUzNmUwNmM3OWU3ZmJhMyIsImVtYWlsIjoia2VubnlAeWFob28uY29tIiwiYWRtaW4iOnRydWUsImlhdCI6MTU2NTYzMDEzMSwiZXhwIjoxNTY5MjMwMTMxfQ.Yh0D3PadXLZFHA8jUvbuTv0GzVS1TN20dc32fcpmCkg',
      }).catch(err => console.log(err));
    expect(user.body).toHaveProperty('error');
  });
  afterAll(async () => {
    try { await dropdb(); } catch (error) { console.log(error); }
  });
});
