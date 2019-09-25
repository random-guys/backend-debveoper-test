import jwt from 'jsonwebtoken';
import config from '../config/config';

const { jwtKey } = config;

/**
 * @class JwtMiddleware
 */
class JwtMiddleware {
  /**
   * @description Check If Token Exist
   * @static
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @memberof JwtMiddleware
   * @returns {object} error
   */
  static checkToken(req, res, next) {
    const header = req.headers.authorization;
    if (typeof header !== 'undefined') {
      const bearer = header.split(' ');
      const token = bearer[1];
      req.token = token;
      next();
    } else {
      // If header is undefined return Forbidden (403)
      return res.status(403).json({
        status: 403,
        message: 'no token found',
      });
    }
  }

  /**
   * @description Generate Token
   * @static
   * @param {object} payload
   * @param {object} jwtSecretKey
   * @param {object} tokenLife
   * @memberof JwtMiddleware
   * @returns {object} token
   */
  static generateToken(payload, jwtSecretKey, tokenLife) {
    return jwt.sign(payload, jwtSecretKey, { expiresIn: tokenLife });
  }

  /**
   * @description Verify Token
   * @static
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @memberof JwtMiddleware
   * @returns {object} User Data
   */
  static verifyToken(req, res, next) {
    jwt.verify(req.token, jwtKey, (err, authorize) => {
      if (err) {
        return res.status(400).json({
          status: 400,
          message: 'Invalid token'
        });
      }

      res.locals.userData = authorize;
      return next();
    });
  }
}

export default JwtMiddleware;
