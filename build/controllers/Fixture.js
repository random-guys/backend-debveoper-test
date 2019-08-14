"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.to-string");

require("regenerator-runtime/runtime");

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _joi = _interopRequireDefault(require("@hapi/joi"));

var _TeamsDB = _interopRequireDefault(require("../db/TeamsDB"));

var _FixturesDB = _interopRequireDefault(require("../db/FixturesDB"));

var _response = _interopRequireDefault(require("../response"));

var _parameters = _interopRequireDefault(require("../middleware/parameters"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

_dotenv.default.config();

var Fixtures =
/*#__PURE__*/
function () {
  function Fixtures() {
    _classCallCheck(this, Fixtures);
  }

  _createClass(Fixtures, null, [{
    key: "add",
    value: function () {
      var _add = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res) {
        var home_team, away_team, _req$body, date, status, check1, check2, fixture, newFixture;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;

                if (req.active.admin) {
                  _context.next = 5;
                  break;
                }

                (0, _response.default)(res, 'Unauthorised user', 401);
                _context.next = 23;
                break;

              case 5:
                home_team = req.body.home_team.toLowerCase();
                away_team = req.body.away_team.toLowerCase();
                _req$body = req.body, date = _req$body.date, status = _req$body.status;
                _context.next = 10;
                return _TeamsDB.default.find(home_team);

              case 10:
                check1 = _context.sent;
                _context.next = 13;
                return _TeamsDB.default.find(away_team);

              case 13:
                check2 = _context.sent;

                if (!(check1 && check2)) {
                  _context.next = 22;
                  break;
                }

                fixture = {
                  home_team,
                  away_team,
                  date,
                  status
                };
                _context.next = 18;
                return _FixturesDB.default.add(fixture);

              case 18:
                newFixture = _context.sent;
                (0, _response.default)(res, _objectSpread({}, newFixture), 200);
                _context.next = 23;
                break;

              case 22:
                (0, _response.default)(res, 'one or both teams does not exist', 400);

              case 23:
                _context.next = 28;
                break;

              case 25:
                _context.prev = 25;
                _context.t0 = _context["catch"](0);
                (0, _response.default)(res, _context.t0, 500);

              case 28:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 25]]);
      }));

      function add(_x, _x2) {
        return _add.apply(this, arguments);
      }

      return add;
    }()
  }, {
    key: "viewOne",
    value: function () {
      var _viewOne = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(req, res) {
        var id, fixture;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                id = req.body.id;
                _context2.next = 4;
                return _FixturesDB.default.find(id);

              case 4:
                fixture = _context2.sent;
                if (fixture) (0, _response.default)(res, fixture, 200);else (0, _response.default)(res, 'fixture does not exist', 401);
                _context2.next = 11;
                break;

              case 8:
                _context2.prev = 8;
                _context2.t0 = _context2["catch"](0);
                (0, _response.default)(res, _context2.t0, 500);

              case 11:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 8]]);
      }));

      function viewOne(_x3, _x4) {
        return _viewOne.apply(this, arguments);
      }

      return viewOne;
    }()
  }, {
    key: "viewAll",
    value: function () {
      var _viewAll = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(req, res) {
        var fixtures;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return _FixturesDB.default.all();

              case 3:
                fixtures = _context3.sent;
                (0, _response.default)(res, fixtures, 200);
                _context3.next = 10;
                break;

              case 7:
                _context3.prev = 7;
                _context3.t0 = _context3["catch"](0);
                (0, _response.default)(res, _context3.t0, 500);

              case 10:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 7]]);
      }));

      function viewAll(_x5, _x6) {
        return _viewAll.apply(this, arguments);
      }

      return viewAll;
    }()
  }, {
    key: "delete",
    value: function () {
      var _delete2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(req, res) {
        var id;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;

                if (req.active.admin) {
                  _context4.next = 5;
                  break;
                }

                (0, _response.default)(res, 'Unauthorised user', 401);
                _context4.next = 9;
                break;

              case 5:
                id = req.body.id;
                _context4.next = 8;
                return _FixturesDB.default.delete(id);

              case 8:
                (0, _response.default)(res, 'fixture successfully deleted', 200);

              case 9:
                _context4.next = 14;
                break;

              case 11:
                _context4.prev = 11;
                _context4.t0 = _context4["catch"](0);
                (0, _response.default)(res, _context4.t0, 500);

              case 14:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[0, 11]]);
      }));

      function _delete(_x7, _x8) {
        return _delete2.apply(this, arguments);
      }

      return _delete;
    }()
  }, {
    key: "change",
    value: function () {
      var _change = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(req, res) {
        var id, member, home_team, away_team, _req$body2, date, status, check1, check2, fixture;

        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;

                if (req.active.admin) {
                  _context5.next = 5;
                  break;
                }

                (0, _response.default)(res, 'Unauthorised user', 401);
                _context5.next = 31;
                break;

              case 5:
                id = req.params.id;
                console.log("#1: ".concat(id));
                _context5.next = 9;
                return _FixturesDB.default.find(id);

              case 9:
                member = _context5.sent;

                if (member) {
                  _context5.next = 14;
                  break;
                }

                (0, _response.default)(res, 'fixture does not exist', 400);
                _context5.next = 31;
                break;

              case 14:
                home_team = req.body.home_team.toLowerCase();
                away_team = req.body.away_team.toLowerCase();
                _req$body2 = req.body, date = _req$body2.date, status = _req$body2.status;
                _context5.next = 19;
                return _TeamsDB.default.find(home_team);

              case 19:
                check1 = _context5.sent;
                _context5.next = 22;
                return _TeamsDB.default.find(away_team);

              case 22:
                check2 = _context5.sent;

                if (!(check1 && check2)) {
                  _context5.next = 30;
                  break;
                }

                fixture = {
                  home_team,
                  away_team,
                  date,
                  status
                };
                _context5.next = 27;
                return _FixturesDB.default.change(id, fixture);

              case 27:
                (0, _response.default)(res, 'fixture updated successfully', 200);
                _context5.next = 31;
                break;

              case 30:
                (0, _response.default)(res, 'one or both teams does not exist', 400);

              case 31:
                _context5.next = 36;
                break;

              case 33:
                _context5.prev = 33;
                _context5.t0 = _context5["catch"](0);
                (0, _response.default)(res, _context5.t0, 500);

              case 36:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[0, 33]]);
      }));

      function change(_x9, _x10) {
        return _change.apply(this, arguments);
      }

      return change;
    }()
  }, {
    key: "filter",
    value: function () {
      var _filter = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6(req, res) {
        var status, fixtures;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.prev = 0;
                status = req.params.status;
                _context6.next = 4;
                return _FixturesDB.default.filter(status);

              case 4:
                fixtures = _context6.sent;
                (0, _response.default)(res, fixtures, 200);
                _context6.next = 11;
                break;

              case 8:
                _context6.prev = 8;
                _context6.t0 = _context6["catch"](0);
                (0, _response.default)(res, _context6.t0, 500);

              case 11:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, null, [[0, 8]]);
      }));

      function filter(_x11, _x12) {
        return _filter.apply(this, arguments);
      }

      return filter;
    }()
  }, {
    key: "addChecker",
    value: function addChecker(req, res, next) {
      var schema = {
        home_team: _parameters.default.home_team,
        away_team: _parameters.default.away_team,
        date: _parameters.default.date,
        status: _parameters.default.status
      };
      var _req$body3 = req.body,
          home_team = _req$body3.home_team,
          away_team = _req$body3.away_team,
          date = _req$body3.date,
          status = _req$body3.status;

      var _joi$validate = _joi.default.validate({
        home_team,
        away_team,
        date,
        status
      }, schema),
          error = _joi$validate.error;

      if (!error) next();else (0, _response.default)(res, error, 400);
    }
  }, {
    key: "idChecker",
    value: function idChecker(req, res, next) {
      var schema = {
        id: _parameters.default.id
      };
      var id = req.body.id;

      var _joi$validate2 = _joi.default.validate({
        id
      }, schema),
          error = _joi$validate2.error;

      if (!error) next();else (0, _response.default)(res, error, 400);
    }
  }, {
    key: "paramChecker",
    value: function paramChecker(req, res, next) {
      var schema = {
        id: _parameters.default.id
      };
      var id = req.params.id;
      console.log(id);

      var _joi$validate3 = _joi.default.validate({
        id
      }, schema),
          error = _joi$validate3.error;

      if (!error) next();else (0, _response.default)(res, error, 400);
    }
  }, {
    key: "statusChecker",
    value: function statusChecker(req, res, next) {
      var schema = {
        status: _parameters.default.status
      };
      var status = req.params.status;

      var _joi$validate4 = _joi.default.validate({
        status
      }, schema),
          error = _joi$validate4.error;

      if (!error) next();else (0, _response.default)(res, error, 400);
    }
  }]);

  return Fixtures;
}();

var _default = Fixtures;
exports.default = _default;