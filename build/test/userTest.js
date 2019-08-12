"use strict";

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.to-string");

require("regenerator-runtime/runtime");

var _supertest = _interopRequireDefault(require("supertest"));

var _server = _interopRequireDefault(require("../server"));

var _db = _interopRequireDefault(require("../db/db"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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
describe('POST /auth/signup', function () {
  test('returns new user data',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var user;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _supertest.default)(_server.default).post('api/v1/auth/signup').send({
              email: 'kenny@yahoo.com',
              first_name: 'Felix',
              last_name: 'Mani',
              password: 'felixer11'
            }).catch(function (err) {
              return console.log(err);
            });

          case 2:
            user = _context.sent;
            expect(user.body).toHaveProperty('data');

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }))); //afterAll(async () => {
  //await client.db('testbase').dropcollection('users');
  //});
});