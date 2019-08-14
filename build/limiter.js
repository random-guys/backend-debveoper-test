"use strict";

var _redis = require("redis");

var _moment = _interopRequireDefault(require("moment"));

var _response = _interopRequireDefault(require("./response"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable consistent-return */

/* eslint-disable no-console */
module.exports = function (req, res, next) {
  _redis.createClient.exists(req, function (err, reply) {
    if (err) {
      console.log('Redis not working...');
      return (0, _response.default)(err, 'Redis not working...', 500);
    }

    if (reply === 1) {
      // user exists
      // check time interval
      _redis.createClient.get(req.headers.user, function (error, output) {
        var data = JSON.parse(output);
        var currentTime = (0, _moment.default)().unix();
        var difference = (currentTime - data.startTime) / 60;

        if (difference >= 1) {
          var body = {
            count: 1,
            startTime: (0, _moment.default)().unix()
          };

          _redis.createClient.set(req.headers.user, JSON.stringify(body)); // allow the request


          next();
        }

        if (difference < 1) {
          if (data.count > 3) {
            return res.json({
              error: 1,
              message: 'throttled limit exceeded...'
            });
          } // update the count and allow the request


          data.count += 1;

          _redis.createClient.set(req.headers.user, JSON.stringify(data)); // allow request


          next();
        }
      });
    } else {
      // add new user
      var body = {
        count: 1,
        startTime: (0, _moment.default)().unix()
      };

      _redis.createClient.set(req.headers.user, JSON.stringify(body)); // allow request


      next();
    }
  });
};