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
      data.db('danielchima').collection('test2');
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
      data.db('danielchima').collection('test2')
        .findOneAndDelete({ team_name: 'chelsea' })
        .then(result => resolve(result));
    }).catch(err => reject(err));
});

beforeAll(async () => {
  try { await opendb(); } catch (error) { console.log(error); }
});

afterAll(async () => {
  try { await closedb(); } catch (error) { console.log(error); }
});


/* TEST CASES FOR TEAMS */
let name;
describe('TEAM TESTS /teams/', () => {
  test('POST adds new team', async () => {
    const user = await request(server)
      .post('/api/v1/teams/')
      .send({
        team_name: 'Arsenal',
        team_size: '14',
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNTE5ZWIyYWUzNmUwNmM3OWU3ZmJhMyIsImVtYWlsIjoia2VubnlAeWFob28uY29tIiwiYWRtaW4iOnRydWUsImlhdCI6MTU2NTYzMDEzMSwiZXhwIjoxNTY5MjMwMTMxfQ.Yh0D3PadXLZFHA8jUvbuTv0GzVS1TN20dc32fcpmCkg',
      }).catch(err => console.log(err));
    name = user.body.data.team_name;
    expect(user.body).toHaveProperty('data');
    expect(user.body.data).toHaveProperty('_id');
    expect(user.body.data).toHaveProperty('team_name');
    expect(user.body).toHaveProperty('status');
    expect(user.body.status).toBe(200);
  });

  test('ERR: returns error when team exist', async () => {
    const user = await request(server)
      .post('/api/v1/teams/')
      .send({
        team_name: 'Arsenal',
        team_size: '14',
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNTE5ZWIyYWUzNmUwNmM3OWU3ZmJhMyIsImVtYWlsIjoia2VubnlAeWFob28uY29tIiwiYWRtaW4iOnRydWUsImlhdCI6MTU2NTYzMDEzMSwiZXhwIjoxNTY5MjMwMTMxfQ.Yh0D3PadXLZFHA8jUvbuTv0GzVS1TN20dc32fcpmCkg',
      }).catch(err => console.log(err));
    expect(user.body).toHaveProperty('error');
    expect(user.body.error).toBe('team already exists');
    expect(user.body).toHaveProperty('status');
    expect(user.body.status).toBe(400);
  });

  test('GET: return single team', async () => {
    const user = await request(server)
      .get(`/api/v1/teams/view/${name}`)
      .send({
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNTE5ZWIyYWUzNmUwNmM3OWU3ZmJhMyIsImVtYWlsIjoia2VubnlAeWFob28uY29tIiwiYWRtaW4iOnRydWUsImlhdCI6MTU2NTYzMDEzMSwiZXhwIjoxNTY5MjMwMTMxfQ.Yh0D3PadXLZFHA8jUvbuTv0GzVS1TN20dc32fcpmCkg',
      }).catch(err => console.log(err));
    expect(user.body).toHaveProperty('data');
    expect(user.body.data).toHaveProperty('_id');
    expect(user.body.data).toHaveProperty('team_name');
    expect(user.body).toHaveProperty('status');
    expect(user.body.status).toBe(200);
  });

  test('GET: return all teams', async () => {
    const user = await request(server)
      .get('/api/v1/teams/all')
      .send({
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNTE5ZWIyYWUzNmUwNmM3OWU3ZmJhMyIsImVtYWlsIjoia2VubnlAeWFob28uY29tIiwiYWRtaW4iOnRydWUsImlhdCI6MTU2NTYzMDEzMSwiZXhwIjoxNTY5MjMwMTMxfQ.Yh0D3PadXLZFHA8jUvbuTv0GzVS1TN20dc32fcpmCkg',
      }).catch(err => console.log(err));
    expect(user.body).toHaveProperty('data');
    expect(user.body.data[1]).toHaveProperty('_id');
    expect(user.body.data[1]).toHaveProperty('team_name');
    expect(user.body).toHaveProperty('status');
    expect(user.body.status).toBe(200);
  });

  test('ERR: incomplete data', async () => {
    const user = await request(server)
      .get('/api/v1/teams/view/Ar')
      .send({
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNTE5ZWIyYWUzNmUwNmM3OWU3ZmJhMyIsImVtYWlsIjoia2VubnlAeWFob28uY29tIiwiYWRtaW4iOnRydWUsImlhdCI6MTU2NTYzMDEzMSwiZXhwIjoxNTY5MjMwMTMxfQ.Yh0D3PadXLZFHA8jUvbuTv0GzVS1TN20dc32fcpmCkg',
      }).catch(err => console.log(err));
    expect(user.body).toHaveProperty('error');
    expect(user.body).toHaveProperty('status');
    expect(user.body.status).toBe(400);
  });

  test('PATCH: updates a teams', async () => {
    const user = await request(server)
      .patch('/api/v1/teams/arsenal')
      .send({
        team_name: 'chelsea',
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNTE5ZWIyYWUzNmUwNmM3OWU3ZmJhMyIsImVtYWlsIjoia2VubnlAeWFob28uY29tIiwiYWRtaW4iOnRydWUsImlhdCI6MTU2NTYzMDEzMSwiZXhwIjoxNTY5MjMwMTMxfQ.Yh0D3PadXLZFHA8jUvbuTv0GzVS1TN20dc32fcpmCkg',
      }).catch(err => console.log(err));
    expect(user.body).toHaveProperty('data');
    expect(user.body).toHaveProperty('status');
    expect(user.body.status).toBe(200);
  });
  test('DELETE: deletes teams', async () => {
    const user = await request(server)
      .delete('/api/v1/teams/')
      .send({
        team_name: 'chelsea',
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNTE5ZWIyYWUzNmUwNmM3OWU3ZmJhMyIsImVtYWlsIjoia2VubnlAeWFob28uY29tIiwiYWRtaW4iOnRydWUsImlhdCI6MTU2NTYzMDEzMSwiZXhwIjoxNTY5MjMwMTMxfQ.Yh0D3PadXLZFHA8jUvbuTv0GzVS1TN20dc32fcpmCkg',
      }).catch(err => console.log(err));
    expect(user.body).toHaveProperty('data');
    expect(user.body).toHaveProperty('status');
    expect(user.body.status).toBe(200);
  });
  afterAll(async () => {
    try { await dropdb(); } catch (error) { console.log(error); }
  });
});
