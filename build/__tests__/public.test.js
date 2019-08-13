"use strict";

require("core-js/modules/es.promise");

var _supertest = _interopRequireDefault(require("supertest"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _mongodb = require("mongodb");

var _index = _interopRequireDefault(require("../models/Db/index"));

var _app = _interopRequireDefault(require("../app"));

var _types = require("@babel/types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-underscore-dangle */

/* eslint-disable linebreak-style */
_dotenv.default.config();

let client;
let db;
let fixtures;
let teams;
const token = process.env.TEST_AUTH_TOKEN;
beforeAll(async () => {
  try {
    client = await _index.default;
    db = client.db();
    fixtures = db.collection('testFixtures');
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
describe('GET /api/v1/public/fixture', () => {
  describe('When the request body parameters are in the proper format', () => {
    test('It responds with an array of all the fixtures', async () => {
      const fixture = await (0, _supertest.default)(_app.default).get('/api/v1/public/fixture').set('Authorization', "Bearer ".concat(token)).catch(err => console.log(err));
      expect(fixture.body).toHaveProperty('data');
      expect(Array.isArray(fixture.body.data)).toBe(true);
    });
  });
});
describe('GET /api/v1/public/fixture?from=YYYY-MM-DD+00:00&to=YYYY-MM-DD+00:00', () => {
  describe('When the request body parameters are in the proper format', () => {
    test('It responds with an array of all the fixtures within the selected dates', async () => {
      const fixture = await (0, _supertest.default)(_app.default).get('/api/v1/public/fixture?from=2019-05-01+00:00&to=2019-04-05+00:00').set('Authorization', "Bearer ".concat(token)).catch(err => console.log(err));
      expect(fixture.body).toHaveProperty('data');
      expect(Array.isArray(fixture.body.data)).toBe(true);
    });
  });
});
describe('GET /api/v1/public/fixture/completed', () => {
  describe('When the request body parameters are in the proper format', () => {
    test('It responds with an array of all the completed fixtures', async () => {
      const fixture = await (0, _supertest.default)(_app.default).get('/api/v1/public/fixture/completed').set('Authorization', "Bearer ".concat(token)).catch(err => console.log(err));
      expect(fixture.body).toHaveProperty('data');
      expect(Array.isArray(fixture.body.data)).toBe(true);
      expect(fixture.body.data[0].status).toBe('completed');
    });
  });
});
describe('GET /api/v1/public/fixture/pending', () => {
  describe('When the request body parameters are in the proper format', () => {
    test('It responds with an array of all the pending fixtures', async () => {
      const fixture = await (0, _supertest.default)(_app.default).get('/api/v1/public/fixture/pending').set('Authorization', "Bearer ".concat(token)).catch(err => console.log(err));
      expect(fixture.body).toHaveProperty('data');
      expect(Array.isArray(fixture.body.data)).toBe(true);
      expect(fixture.body.data[0].status).toBe('pending');
    });
  });
});
describe('GET /api/v1/public/team', () => {
  describe('When the request body parameters are in the proper format', () => {
    test('It responds with an array of all the teams', async () => {
      const team = await (0, _supertest.default)(_app.default).get('/api/v1/public/team').set('Authorization', "Bearer ".concat(token)).catch(err => console.log(err));
      expect(team.body).toHaveProperty('data');
      expect(Array.isArray(team.body.data)).toBe(true);
    });
  });
});
describe('GET /api/v1/public/team/:teamName', () => {
  describe('When the request body parameters are in the proper format', () => {
    test('It responds with details of the team', async () => {
      const team = await (0, _supertest.default)(_app.default).get('/api/v1/public/team/manutd').set('Authorization', "Bearer ".concat(token)).catch(err => console.log(err));
      expect(team.body).toHaveProperty('data');
      expect(team.body.data.name).toBe('manutd');
    });
  });
});
describe('GET /api/v1/public/team?min_players=0&max_players=1', () => {
  describe('When the request body parameters are in the proper format', () => {
    test('It responds with an array of all the teams which fit the player quantity parameters', async () => {
      const team = await (0, _supertest.default)(_app.default).get('/api/v1/public/team?min_players=5&max_players=15').set('Authorization', "Bearer ".concat(token)).catch(err => console.log(err));
      expect(team.body).toHaveProperty('data');
      expect(team.body.data[0].players).toBeGreaterThanOrEqual(5);
      expect(team.body.data[team.body.data.length - 1].players).toBeLessThanOrEqual(15);
      expect(Array.isArray(team.body.data)).toBe(true);
    });
  });
});