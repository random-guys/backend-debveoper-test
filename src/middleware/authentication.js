/* eslint-disable no-console */
/* eslint-disable linebreak-style */
import jwt from 'jsonwebtoken';
import response from '../response';

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
