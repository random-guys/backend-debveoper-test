/* eslint-disable consistent-return */
/* eslint-disable no-console */

import { createClient as client } from 'redis';
import moment from 'moment';
import response from './response';


module.exports = (req, res, next) => {
  client.exists(req, (err, reply) => {
    if (err) {
      console.log('Redis not working...');
      return response(err, 'Redis not working...', 500);
    }
    if (reply === 1) {
      // user exists
      // check time interval
      client.get(req.headers.user, (error, output) => {
        const data = JSON.parse(output);
        const currentTime = moment().unix();
        const difference = (currentTime - data.startTime) / 60;
        if (difference >= 1) {
          const body = {
            count: 1,
            startTime: moment().unix(),
          };
          client.set(req.headers.user, JSON.stringify(body));
          // allow the request
          next();
        }
        if (difference < 1) {
          if (data.count > 3) {
            return res.json({ error: 1, message: 'throttled limit exceeded...' });
          }
          // update the count and allow the request
          data.count += 1;
          client.set(req.headers.user, JSON.stringify(data));
          // allow request
          next();
        }
      });
    } else {
      // add new user
      const body = {
        count: 1,
        startTime: moment().unix(),
      };
      client.set(req.headers.user, JSON.stringify(body));
      // allow request
      next();
    }
  });
};
