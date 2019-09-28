import User from '../models/User';
import hashPassword from '../helpers/hashPassword';
import jwt from '../middlewares/jwt';
import userObject from '../helpers/userObject';
import config from '../config/config';

const {
  jwtKey, jwtLife, refreshJwtLife
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
        newData: {
          firstname, lastname, username, email, password
        }
      } = res.locals.userInputData;
      // hash password
      const hash = hashPassword(password);
      const user = await new User({
        firstname,
        lastname,
        username,
        email,
        admin: false,
        password: hash
      });
      user.save();
      const userData = userObject(user);
      const token = jwt.generateToken(userData, jwtKey, jwtLife);
      const refreshToken = jwt
        .generateToken(userData, jwtKey, refreshJwtLife);
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

  /**
   * @description User Signin Controller
   * @param {object} req
   * @param {object} res
   * @returns {object} object
   * @memberof AuthController
   */
  static async userSignin(req, res) {
    try {
      const { user } = res.locals;

      const userData = userObject(user[0]);
      const token = jwt.generateToken(userData, jwtKey, jwtLife);
      const refreshToken = jwt
        .generateToken(userData, jwtKey, refreshJwtLife);
      return res.status(200).json({
        status: 200,
        message: 'Successfully Signed In',
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

  /**
   * @description Admin Signup Controller
   * @param {object} req
   * @param {object} res
   * @returns {object} object
   * @memberof AuthController
   */
  static async adminSignup(req, res) {
    try {
      const {
        role,
        newData: {
          firstname, lastname, username, email, password
        }
      } = res.locals.userInputData;
      // hash password
      const hash = hashPassword(password);
      const user = await new User({
        firstname,
        lastname,
        username,
        email,
        admin: role,
        password: hash
      });
      user.save();
      const userData = userObject(user);
      const token = jwt.generateToken(userData, jwtKey, jwtLife);
      const refreshToken = jwt
        .generateToken(userData, jwtKey, refreshJwtLife);
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

  /**
   * @description Admin Signin Controller
   * @param {object} req
   * @param {object} res
   * @returns {object} object
   * @memberof AuthController
   */
  static async adminSignin(req, res) {
    try {
      const { user } = res.locals;

      const userData = userObject(user[0]);
      const token = jwt.generateToken(userData, jwtKey, jwtLife);
      const refreshToken = jwt
        .generateToken(userData, jwtKey, refreshJwtLife);
      return res.status(200).json({
        status: 200,
        message: 'Successfully Signed In',
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
