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

var Team =
/*#__PURE__*/
function () {
  function Team() {
    _classCallCheck(this, Team);
  }

  _createClass(Team, null, [{
    key: "add",
    value: function () {
      var _add = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res) {
        var team_name, member, team_size, team;
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
                _context.next = 19;
                break;

              case 5:
                team_name = req.body.team_name.toLowerCase();
                console.log("#1: ".concat(team_name));
                _context.next = 9;
                return _TeamsDB.default.find(team_name);

              case 9:
                member = _context.sent;

                if (member) {
                  _context.next = 18;
                  break;
                }

                team_size = req.body.team_size;
                _context.next = 14;
                return _TeamsDB.default.add({
                  team_name,
                  team_size
                });

              case 14:
                team = _context.sent;
                (0, _response.default)(res, _objectSpread({}, team), 200);
                _context.next = 19;
                break;

              case 18:
                (0, _response.default)(res, 'team already exists', 400);

              case 19:
                _context.next = 24;
                break;

              case 21:
                _context.prev = 21;
                _context.t0 = _context["catch"](0);
                (0, _response.default)(res, _context.t0, 500);

              case 24:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 21]]);
      }));

      function add(_x, _x2) {
        return _add.apply(this, arguments);
      }

      return add;
    }()
  }, {
    key: "viewAll",
    value: function () {
      var _viewAll = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(req, res) {
        var team;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return _TeamsDB.default.all();

              case 3:
                team = _context2.sent;
                (0, _response.default)(res, team, 200);
                _context2.next = 10;
                break;

              case 7:
                _context2.prev = 7;
                _context2.t0 = _context2["catch"](0);
                (0, _response.default)(res, _context2.t0, 500);

              case 10:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 7]]);
      }));

      function viewAll(_x3, _x4) {
        return _viewAll.apply(this, arguments);
      }

      return viewAll;
    }()
  }, {
    key: "viewOne",
    value: function () {
      var _viewOne = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(req, res) {
        var team_name, team;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                team_name = req.body.team_name.toLowerCase();
                _context3.next = 4;
                return _TeamsDB.default.find(team_name);

              case 4:
                team = _context3.sent;
                if (team) (0, _response.default)(res, team, 200);else (0, _response.default)(res, 'team does not exist', 401);
                _context3.next = 11;
                break;

              case 8:
                _context3.prev = 8;
                _context3.t0 = _context3["catch"](0);
                (0, _response.default)(res, _context3.t0, 500);

              case 11:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 8]]);
      }));

      function viewOne(_x5, _x6) {
        return _viewOne.apply(this, arguments);
      }

      return viewOne;
    }()
  }, {
    key: "delete",
    value: function () {
      var _delete2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(req, res) {
        var team_name;
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
                team_name = req.body.team_name.toLowerCase();
                _context4.next = 8;
                return _TeamsDB.default.delete(team_name);

              case 8:
                (0, _response.default)(res, "".concat(team_name, " successfully deleted"), 200);

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
    key: "addChecker",
    value: function addChecker(req, res, next) {
      var schema = {
        team_name: _parameters.default.team_name,
        team_size: _parameters.default.team_size
      };
      var _req$body = req.body,
          team_name = _req$body.team_name,
          team_size = _req$body.team_size;

      var _joi$validate = _joi.default.validate({
        team_name,
        team_size
      }, schema),
          error = _joi$validate.error;

      if (!error) next();else (0, _response.default)(res, error, 400);
    }
  }, {
    key: "nameChecker",
    value: function nameChecker(req, res, next) {
      var schema = {
        team_name: _parameters.default.team_name
      };
      var team_name = req.body.team_name;

      var _joi$validate2 = _joi.default.validate({
        team_name
      }, schema),
          error = _joi$validate2.error;

      if (!error) next();else (0, _response.default)(res, error, 400);
    }
  }]);

  return Team;
}();

var _default = Team;
exports.default = _default;