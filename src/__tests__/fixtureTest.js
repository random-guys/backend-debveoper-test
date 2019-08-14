/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
import request from 'supertest';
import { ObjectID as ID } from 'mongodb';
import dotenv from 'dotenv';
import server from '../server';
import client from '../db/db';

dotenv.config();
const opendb = () => new Promise((resolve, reject) => {
  client
    .then((data) => {
      data.db('danielchima').collection('test3');
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

const dropdb = id => new Promise((resolve, reject) => {
  client
    .then((data) => {
      data.db('danielchima').collection('testcollection')
        .findOneAndDelete({ _id: ID(id) })
        .then(result => resolve(result));
    }).catch(err => reject(err));
});

beforeAll(async () => {
  try { await opendb(); } catch (error) { console.log(error); }
});

afterAll(async () => {
  try { await closedb(); } catch (error) { console.log(error); }
});

let id;
describe('FIXTURES TESTS /fixtures/', () => {
  test('POST adds new fixtures', async () => {
    const user = await request(server)
      .post('/api/v1/fixtures/')
      .send({
        home_team: 'barcelona',
        away_team: 'kent',
        date: '2019-08-25T18:00:00.000Z',
        status: 'pending',
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNTE5ZWIyYWUzNmUwNmM3OWU3ZmJhMyIsImVtYWlsIjoia2VubnlAeWFob28uY29tIiwiYWRtaW4iOnRydWUsImlhdCI6MTU2NTYzMDEzMSwiZXhwIjoxNTY5MjMwMTMxfQ.Yh0D3PadXLZFHA8jUvbuTv0GzVS1TN20dc32fcpmCkg',

      }).catch(err => console.log(err));
    id = user.body.data._id;
    console.log(`#test: ${user.body.data._id}`);
    expect(user.body).toHaveProperty('data');
    expect(user.body.data).toHaveProperty('_id');
    expect(user.body.data).toHaveProperty('home_team');
    expect(user.body.data).toHaveProperty('away_team');
    expect(user.body).toHaveProperty('status');
    expect(user.body.status).toBe(200);

  });

  test('GET get a single fixture', async () => {
    const user = await request(server)
      .get('/api/v1/fixtures/view')
      .send({
        id,
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNTE5ZWIyYWUzNmUwNmM3OWU3ZmJhMyIsImVtYWlsIjoia2VubnlAeWFob28uY29tIiwiYWRtaW4iOnRydWUsImlhdCI6MTU2NTYzMDEzMSwiZXhwIjoxNTY5MjMwMTMxfQ.Yh0D3PadXLZFHA8jUvbuTv0GzVS1TN20dc32fcpmCkg',

      }).catch(err => console.log(err));
    expect(user.body).toHaveProperty('data');
    expect(user.body.data).toHaveProperty('_id');
    expect(user.body.data).toHaveProperty('home_team');
    expect(user.body.data).toHaveProperty('away_team');
    expect(user.body).toHaveProperty('status');
    expect(user.body.status).toBe(200);
  });

  test('GET get a filtered fixture', async () => {
    const user = await request(server)
      .get('/api/v1/fixtures/pending')
      .send({
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNTE5ZWIyYWUzNmUwNmM3OWU3ZmJhMyIsImVtYWlsIjoia2VubnlAeWFob28uY29tIiwiYWRtaW4iOnRydWUsImlhdCI6MTU2NTYzMDEzMSwiZXhwIjoxNTY5MjMwMTMxfQ.Yh0D3PadXLZFHA8jUvbuTv0GzVS1TN20dc32fcpmCkg',

      }).catch(err => console.log(err));
    expect(user.body).toHaveProperty('data');
    expect(user.body.data[0]).toHaveProperty('_id');
    expect(user.body.data[0]).toHaveProperty('home_team');
    expect(user.body.data[0]).toHaveProperty('away_team');
    expect(user.body.data[0]).toHaveProperty('status');
    expect(user.body).toHaveProperty('status');
    expect(user.body.status).toBe(200);
  });

  test('DELETE remove a single fixture', async () => {
    const user = await request(server)
      .delete('/api/v1/fixtures/')
      .send({
        id,
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNTE5ZWIyYWUzNmUwNmM3OWU3ZmJhMyIsImVtYWlsIjoia2VubnlAeWFob28uY29tIiwiYWRtaW4iOnRydWUsImlhdCI6MTU2NTYzMDEzMSwiZXhwIjoxNTY5MjMwMTMxfQ.Yh0D3PadXLZFHA8jUvbuTv0GzVS1TN20dc32fcpmCkg',

      }).catch(err => console.log(err));
    expect(user.body).toHaveProperty('data');
    expect(user.body).toHaveProperty('status');
    expect(user.body.status).toBe(200);

  });

  afterAll(async () => {
    try { await dropdb(id); } catch (error) { console.log(error); }
    done();
  });
});
