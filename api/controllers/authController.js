import User from '../models/User';
import hashPassword from '../helpers/hashPassword';
import jwt from '../middlewares/jwt';
import userObject from '../helpers/userObject';
import config from '../config/config';

const {
  jwtKey, refreshJwtKey, jwtLife, refreshJwtLife
} = config;

/**
 * @class AuthController
 */
class AuthController {
  /**
   * @description User Signup Controller
   * @param {object} req
   * @param {object} res
   * @returns {object} object
   * @memberof AuthController
   */
  static async userSignup(req, res) {
    try {
      const {
        firstname, lastname, username, email, password
      } = res.locals.userInputData;
      // hash password
      const hash = hashPassword(password);
      const user = await new User({
        firstname,
        lastname,
        username,
        email,
        password: hash
      });
      user.save();
      const userData = userObject(user);
      const token = jwt.generateToken(userData, jwtKey, jwtLife);
      const refreshToken = jwt
        .generateToken(userData, refreshJwtKey, refreshJwtLife);
      return res.status(201).json({
        status: 201,
        message: 'Successfully Signed Up',
        token,
        refreshToken,
      });
    } catch (error) {
      /* istanbul ignore next */
      return res.status(500).json({
        status: 500,
        message: error.message
      });
    }
  }
}

export default AuthController;
