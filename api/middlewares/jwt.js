import jwt from 'jsonwebtoken';

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
  // static checkToken(req, res, next) {
  //   const header = req.headers.authorization;
  //   if (typeof header !== 'undefined') {
  //     const bearer = header.split(' ');
  //     const token = bearer[1];
  //     req.token = token;
  //     next();
  //   } else {
  //     // If header is undefined return Forbidden (403)
  //     return res.status(403).json({
  //       status: 403,
  //       message: 'You are not logged in',
  //     });
  //   }
  // }

  /**
   * @description Generate Token
   * @static
   * @param {object} payload
   * @param {object} jwtKey
   * @param {object} tokenLife
   * @memberof JwtMiddleware
   * @returns {object} token
   */
  static generateToken(payload, jwtKey, tokenLife) {
    return jwt.sign(payload, jwtKey, { expiresIn: tokenLife });
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
  // static verifyToken(req, res, next) {
  //   jwt.verify(req.params.token, jwtKey, (err, authorize) => {
  //     if (err) {
  //       return res.status(400).json({
  //         status: 400,
  //         data: 'Invalid token'
  //       });
  //     }

  //     res.locals.userData = authorize;
  //     return next();
  //   });
  // }
}

export default JwtMiddleware;
