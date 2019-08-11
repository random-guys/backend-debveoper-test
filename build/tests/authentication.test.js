"use strict";

require("core-js/modules/es.promise");

var _supertest = _interopRequireDefault(require("supertest"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _index = _interopRequireDefault(require("../models/Db/index"));

var _app = _interopRequireDefault(require("../app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable linebreak-style */
_dotenv.default.config();

let client;
let db;
let users;
beforeAll(async () => {
  try {
    client = await _index.default;
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
      const newUser = await (0, _supertest.default)(_app.default).post('/api/auth/signup/user').send({
        firstName: 'James',
        lastName: 'Doe',
        email: 'jamesdomkkk@test.com',
        password: '123456'
      }).catch(err => console.log(err));
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