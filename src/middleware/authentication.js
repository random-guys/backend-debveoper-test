/* eslint-disable no-console */
/* eslint-disable linebreak-style */
import redis from 'redis';
import moment from 'moment';
import jwt from 'jsonwebtoken';
import response from '../response';

const redisClient = redis.createClient(process.env.REDIS_URL);


require('dotenv').config();

class Authentication {
  static async verifyToken(req, res, next) {
    const { authorization } = req.headers;
    // Check for the token
    if (!authorization) {
      response(res, 400, 'Missing token');
    } else {
      try {
        const tokenArray = authorization.split(' ');
        const token = tokenArray[1];
        const user = await jwt.verify(token, process.env.JWT_SECRET);
        if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'development') {
          redisClient.exists(user.id, (err, reply) => {
            if (err) {
              console.log('Redis not working...');
              // process.exit(0);
              // If redis isn't working still allow the request to go through
              next();
            }
            if (reply === 1) {
              // user exists
              // check time interval
              redisClient.get(user.id, (err, reply2) => {
                const data = JSON.parse(reply2);
                const currentTime = moment().unix();
                const difference = (currentTime - data.startTime) / 60;
                if (difference >= 1) {
                  const body = {
                    count: 1,
                    startTime: moment().unix(),
                  };
                  redisClient.set(user.id, JSON.stringify(body));
                  // allow the request
                  // Create user object in the request
                  req.user = user;
                  next();
                }
                if (difference < 1) {
                  if (data.count > 10) {
                    return res.status(429).json({ status: 429, message: 'API limit reached', success: false });
                  }
                  // update the count and allow the request
                  data.count++;
                  redisClient.set(user.id, JSON.stringify(data));
                  // allow request
                  // Create user object in the request
                  req.user = user;
                  next();
                }
              });
            } else {
              // add new user
              const body = {
                count: 1,
                startTime: moment().unix(),
              };
              redisClient.set(user.id, JSON.stringify(body));
              // allow request
              // Create user object in the request
              req.user = user;
              next();
            }
          });
        }
        // Create user object in the request
        req.user = user;
        next();
      } catch (error) {
        response(res, 500, error);
      }
    }
  }

  static async adminVerifyToken(req, res, next) {
    const { authorization } = req.headers;
    // Check for the token
    if (!authorization) {
      response(res, 400, 'Missing token');
    } else {
      try {
        const tokenArray = authorization.split(' ');
        const token = tokenArray[1];
        const user = await jwt.verify(token, process.env.JWT_SECRET);
        if (user.isAdmin) {
          // Create user object in the request
          req.user = user;
          next();
        } else {
          response(res, 400, 'You are not an admin');
        }
      } catch (error) {
        response(res, 500, error);
      }
    }
  }
}

export default Authentication;
