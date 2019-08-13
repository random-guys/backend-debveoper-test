"use strict";

require("core-js/modules/es.promise");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _response = _interopRequireDefault(require("../response"));

var _User = _interopRequireDefault(require("../models/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class AuthController {
  static async signUp(req, res) {
    try {
      const {
        firstName,
        lastName,
        password,
        address,
        phoneNumber
      } = req.body; // set to lowercase

      const email = req.body.email.toLowerCase();
      const userExists = await _User.default.findUser(email);

      if (userExists) {
        (0, _response.default)(res, 400, 'Email already exists');
      } else {
        // Store user data
        // Hash password
        const hashedPassword = await _bcrypt.default.hash(password, Number(process.env.SALT_ROUNDS));
        const isAdmin = !/user/i.test(req.path);
        const userObject = {
          firstName,
          lastName,
          email,
          phoneNumber,
          password: hashedPassword,
          address,
          isAdmin
        };
        const newUser = await _User.default.createUser(userObject); // Generate jwt

        const token = _jsonwebtoken.default.sign({
          id: newUser._id,
          email,
          isAdmin
        }, process.env.JWT_SECRET, {
          expiresIn: '8760h'
        }); // Final response


        (0, _response.default)(res, 201, _objectSpread({
          token
        }, newUser));
      }
    } catch (error) {
      (0, _response.default)(res, 500, error);
    }
  }

  static async signIn(req, res) {
    try {
      const email = req.body.email.toLowerCase();
      const {
        password
      } = req.body;
      const user = await _User.default.findUser(email);

      if (user) {
        // Compare passwords
        const match = await _bcrypt.default.compare(password, user.password);

        if (match) {
          // (same-boolean) If the passwords match
          const token = _jsonwebtoken.default.sign({
            id: user._id,
            email,
            isAdmin: user.isAdmin
          }, process.env.JWT_SECRET, {
            expiresIn: '8760h'
          });

          (0, _response.default)(res, 200, {
            token,
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
          });
        } else {
          (0, _response.default)(res, 400, 'The Email/Paswword is incorrect');
        }
      } else {
        (0, _response.default)(res, 400, 'The Email/Paswword is incorrect');
      }
    } catch (error) {
      (0, _response.default)(res, 500, 'The Email/Paswword is incorrect');
    }
  }

}

var _default = AuthController;
exports.default = _default;