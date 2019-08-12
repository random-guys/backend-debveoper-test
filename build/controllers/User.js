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

require("core-js/modules/es6.regexp.replace");

require("regenerator-runtime/runtime");

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _joi = _interopRequireDefault(require("@hapi/joi"));

var _UsersDB = _interopRequireDefault(require("../db/UsersDB"));

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

var User =
/*#__PURE__*/
function () {
  function User() {
    _classCallCheck(this, User);
  }

  _createClass(User, null, [{
    key: "signup",
    value: function () {
      var _signup = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res) {
        var _req$body, first_name, last_name, password, email, member, admin, hashPass, createdUser, newUser;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _req$body = req.body, first_name = _req$body.first_name, last_name = _req$body.last_name, password = _req$body.password;
                email = req.body.email.replace(/\s/g, '').toLowerCase();
                _context.next = 5;
                return _UsersDB.default.find(email);

              case 5:
                member = _context.sent;

                if (!member) {
                  _context.next = 10;
                  break;
                }

                (0, _response.default)(res, 'User exists', 400);
                _context.next = 20;
                break;

              case 10:
                admin = true;
                _context.next = 13;
                return _bcrypt.default.hash(password, 10);

              case 13:
                hashPass = _context.sent;
                createdUser = {
                  email,
                  first_name,
                  last_name,
                  password: hashPass,
                  admin
                };
                _context.next = 17;
                return _UsersDB.default.create(createdUser);

              case 17:
                newUser = _context.sent;
                newUser.token = _jsonwebtoken.default.sign({
                  id: newUser.id,
                  email,
                  admin
                }, process.env.PRIVATE_KEY, {
                  expiresIn: '1000h'
                });
                (0, _response.default)(res, _objectSpread({}, newUser), 200);

              case 20:
                _context.next = 25;
                break;

              case 22:
                _context.prev = 22;
                _context.t0 = _context["catch"](0);
                (0, _response.default)(res, _context.t0, 500);

              case 25:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 22]]);
      }));

      function signup(_x, _x2) {
        return _signup.apply(this, arguments);
      }

      return signup;
    }()
  }, {
    key: "signin",
    value: function () {
      var _signin = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(req, res) {
        var password, email, member, passwordMatch;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                // get password from request body
                password = req.body.password; // get email from client

                email = req.body.email.replace(/\s/g, '').toLowerCase(); // check if user is in database and

                _context2.next = 5;
                return _UsersDB.default.find(email);

              case 5:
                member = _context2.sent;

                if (member) {
                  _context2.next = 10;
                  break;
                }

                // throw error since email isn't in server
                (0, _response.default)(res, 'Email does not exist', 401);
                _context2.next = 14;
                break;

              case 10:
                _context2.next = 12;
                return _bcrypt.default.compare(password, member.password);

              case 12:
                passwordMatch = _context2.sent;

                // if password doesn't match, throw an error
                if (!passwordMatch) {
                  (0, _response.default)(res, 'invalid password entered', 401);
                } else {
                  member.token = _jsonwebtoken.default.sign({
                    id: member.id,
                    email,
                    admin: member.admin
                  }, process.env.PRIVATE_KEY, {
                    expiresIn: '1000h'
                  });
                  (0, _response.default)(res, member, 200);
                }

              case 14:
                _context2.next = 19;
                break;

              case 16:
                _context2.prev = 16;
                _context2.t0 = _context2["catch"](0);
                (0, _response.default)(res, _context2.t0, 500);

              case 19:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 16]]);
      }));

      function signin(_x3, _x4) {
        return _signin.apply(this, arguments);
      }

      return signin;
    }() // validations and checkers for user

  }, {
    key: "signupCheck",
    value: function signupCheck(req, res, next) {
      var schema = {
        first_name: _parameters.default.first_name,
        last_name: _parameters.default.last_name,
        email: _parameters.default.email,
        password: _parameters.default.password
      };

      var _joi$validate = _joi.default.validate(_objectSpread({}, req.body), schema),
          error = _joi$validate.error;

      if (!error) next();else (0, _response.default)(res, 400, error);
    }
  }, {
    key: "signinCheck",
    value: function signinCheck(req, res, next) {
      var schema = {
        email: _parameters.default.email,
        password: _parameters.default.password
      };

      var _joi$validate2 = _joi.default.validate(_objectSpread({}, req.body), schema),
          error = _joi$validate2.error;

      if (!error) next();else (0, _response.default)(res, 400, error);
    }
  }, {
    key: "checkToken",
    value: function () {
      var _checkToken = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(req, res, next) {
        var token, online;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                token = req.body.token;

                if (!token) {
                  _context3.next = 15;
                  break;
                }

                _context3.prev = 2;
                _context3.next = 5;
                return _jsonwebtoken.default.verify(token, process.env.PRIVATE_KEY);

              case 5:
                online = _context3.sent;
                req.activeUser.admin = online.admin;
                next();
                _context3.next = 13;
                break;

              case 10:
                _context3.prev = 10;
                _context3.t0 = _context3["catch"](2);
                (0, _response.default)(res, _context3.t0, 500);

              case 13:
                _context3.next = 16;
                break;

              case 15:
                (0, _response.default)(res, 'Token is not present', 401);

              case 16:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[2, 10]]);
      }));

      function checkToken(_x5, _x6, _x7) {
        return _checkToken.apply(this, arguments);
      }

      return checkToken;
    }()
  }]);

  return User;
}();

var _default = User;
exports.default = _default;