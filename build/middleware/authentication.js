"use strict";

require("core-js/modules/es.promise");

require("core-js/modules/es.string.split");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _redis = _interopRequireDefault(require("redis"));

var _moment = _interopRequireDefault(require("moment"));

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
        const user = await _jsonwebtoken.default.verify(token, process.env.JWT_SECRET);

        if (process.env.NODE_ENV === 'production') {
          const redisClient = _redis.default.createClient(process.env.REDIS_URL);

          redisClient.exists(user.id, (err, reply) => {
            if (err) {
              console.log('Redis not working...'); // process.exit(0);
              // If redis isn't working still allow the request to go through

              next();
            }

            if (reply === 1) {
              // user exists
              // check time interval
              redisClient.get(user.id, (err, reply2) => {
                const data = JSON.parse(reply2);
                const currentTime = (0, _moment.default)().unix();
                const difference = (currentTime - data.startTime) / 60;

                if (difference >= 1) {
                  const body = {
                    count: 1,
                    startTime: (0, _moment.default)().unix()
                  };
                  redisClient.set(user.id, JSON.stringify(body)); // allow the request
                  // Create user object in the request

                  req.user = user;
                  next();
                }

                if (difference < 1) {
                  if (data.count > 10) {
                    return res.status(429).json({
                      status: 429,
                      message: 'API limit reached',
                      success: false
                    });
                  } // update the count and allow the request


                  data.count++;
                  redisClient.set(user.id, JSON.stringify(data)); // allow request
                  // Create user object in the request

                  req.user = user;
                  next();
                }
              });
            } else {
              // add new user
              const body = {
                count: 1,
                startTime: (0, _moment.default)().unix()
              };
              redisClient.set(user.id, JSON.stringify(body)); // allow request
              // Create user object in the request

              req.user = user;
              next();
            }
          });
        } else {
          // Create user object in the request
          req.user = user;
          next();
        }
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