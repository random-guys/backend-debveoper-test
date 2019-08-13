"use strict";

require("regenerator-runtime/runtime");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.to-string");

var _supertest = _interopRequireDefault(require("supertest"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _server = _interopRequireDefault(require("../server"));

var _db = _interopRequireDefault(require("../db/db"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

_dotenv.default.config();

var opendb = function opendb() {
  return new Promise(function (resolve, reject) {
    _db.default.then(function (data) {
      data.db('danielchima').collection('testcollection');
      resolve(data);
    }).catch(function (err) {
      return reject(err);
    });
  });
};

var closedb = function closedb() {
  return new Promise(function (resolve, reject) {
    _db.default.then(function (data) {
      data.close();
      resolve(data);
    }).catch(function (err) {
      return reject(err);
    });
  });
};

var dropdb = function dropdb() {
  return new Promise(function (resolve, reject) {
    _db.default.then(function (data) {
      data.db('danielchima').collection('testcollection').drop().then(function (result) {
        return resolve(result);
      });
    }).catch(function (err) {
      return reject(err);
    });
  });
};

beforeAll(
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
regeneratorRuntime.mark(function _callee() {
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return opendb();

        case 3:
          _context.next = 8;
          break;

        case 5:
          _context.prev = 5;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);

        case 8:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, null, [[0, 5]]);
})));
afterAll(
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
regeneratorRuntime.mark(function _callee2() {
  return regeneratorRuntime.wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return closedb();

        case 3:
          _context2.next = 8;
          break;

        case 5:
          _context2.prev = 5;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0);

        case 8:
        case "end":
          return _context2.stop();
      }
    }
  }, _callee2, null, [[0, 5]]);
})));
/* TEST CASES FOR USER */

describe('TEAM TESTS /teams/', function () {
  test('POST adds new team',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3() {
    var user;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return (0, _supertest.default)(_server.default).post('/api/v1/teams/').send({
              team_name: 'Arsenal FC',
              team_size: '14',
              token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNTE5ZWIyYWUzNmUwNmM3OWU3ZmJhMyIsImVtYWlsIjoia2VubnlAeWFob28uY29tIiwiYWRtaW4iOnRydWUsImlhdCI6MTU2NTYzMDEzMSwiZXhwIjoxNTY5MjMwMTMxfQ.Yh0D3PadXLZFHA8jUvbuTv0GzVS1TN20dc32fcpmCkg'
            }).catch(function (err) {
              return console.log(err);
            });

          case 2:
            user = _context3.sent;
            expect(user.body).toHaveProperty('data');

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  })));
  test('ERR: returns error when team exist',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4() {
    var user;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return (0, _supertest.default)(_server.default).post('/api/v1/teams/').send({
              team_name: 'Arsenal FC',
              team_size: '14',
              token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNTE5ZWIyYWUzNmUwNmM3OWU3ZmJhMyIsImVtYWlsIjoia2VubnlAeWFob28uY29tIiwiYWRtaW4iOnRydWUsImlhdCI6MTU2NTYzMDEzMSwiZXhwIjoxNTY5MjMwMTMxfQ.Yh0D3PadXLZFHA8jUvbuTv0GzVS1TN20dc32fcpmCkg'
            }).catch(function (err) {
              return console.log(err);
            });

          case 2:
            user = _context4.sent;
            expect(user.body).toHaveProperty('error');

          case 4:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  })));
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

  test('ERR: incomplete data',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee5() {
    var user;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return (0, _supertest.default)(_server.default).post('/api/v1/teams/').send({
              team_name: 'Ar',
              token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNTE5ZWIyYWUzNmUwNmM3OWU3ZmJhMyIsImVtYWlsIjoia2VubnlAeWFob28uY29tIiwiYWRtaW4iOnRydWUsImlhdCI6MTU2NTYzMDEzMSwiZXhwIjoxNTY5MjMwMTMxfQ.Yh0D3PadXLZFHA8jUvbuTv0GzVS1TN20dc32fcpmCkg'
            }).catch(function (err) {
              return console.log(err);
            });

          case 2:
            user = _context5.sent;
            expect(user.body).toHaveProperty('error');

          case 4:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  })));
  afterAll(
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee6() {
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _context6.next = 3;
            return dropdb();

          case 3:
            _context6.next = 8;
            break;

          case 5:
            _context6.prev = 5;
            _context6.t0 = _context6["catch"](0);
            console.log(_context6.t0);

          case 8:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[0, 5]]);
  })));
});