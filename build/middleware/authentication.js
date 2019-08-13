"use strict";

require("core-js/modules/es.promise");

require("core-js/modules/es.string.split");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _response = _interopRequireDefault(require("../response"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-console */

/* eslint-disable linebreak-style */
require('dotenv').config();

class Authentication {
  static async verifyToken(req, res, next) {
    const {
      authorization
    } = req.headers; // Check for the token

    if (!authorization) {
      (0, _response.default)(res, 400, 'Missing token');
    } else {
      try {
        const tokenArray = authorization.split(' ');
        const token = tokenArray[1];
        const user = await _jsonwebtoken.default.verify(token, process.env.JWT_SECRET); // Create user object in the request

        req.user = user;
        next();
      } catch (error) {
        (0, _response.default)(res, 500, error);
      }
    }
  }

  static async adminVerifyToken(req, res, next) {
    const {
      authorization
    } = req.headers; // Check for the token

    if (!authorization) {
      (0, _response.default)(res, 400, 'Missing token');
    } else {
      try {
        const tokenArray = authorization.split(' ');
        const token = tokenArray[1];
        const user = await _jsonwebtoken.default.verify(token, process.env.JWT_SECRET);

        if (user.isAdmin) {
          // Create user object in the request
          req.user = user;
          next();
        } else {
          (0, _response.default)(res, 400, 'You are not an admin');
        }
      } catch (error) {
        (0, _response.default)(res, 500, error);
      }
    }
  }

}

var _default = Authentication;
exports.default = _default;