/* eslint-disable camelcase */
import User from '../models/users.model';
import GeneralUtils from '../utils/general.utilities';
import Auth from '../middlewares/auth';

class UserService {
  /** Add user to the db
   * @description Operate on a user and his account
   * @param req
   */

  static async create(req) {
    try {
      const foundUser = await User.findOne({ email: req.body.email });
      if (foundUser) {
        throw new Error('Email is already in use');
      }
      const {
        first_name, last_name, is_admin, email,
      } = req.body;
      const password = await GeneralUtils.hash(req.body.password);
      const newUser = new User({
        first_name,
        last_name,
        email,
        is_admin: is_admin || false,
        password,
      });
      await newUser.save();
      const token = await Auth.signJwt({
        id: newUser.id,
        is_admin: newUser.is_admin,
      });
      return {
        token,
        id: newUser.id,
        first_name,
        last_name,
        is_admin: newUser.is_admin,
        email,
      };
    } catch (err) {
      throw err;
    }
  }

  /** Signs user into account
   * @description signs user into their account
   * @body {object} a new user object
   */

  static async login(req) {
    try {
      const foundUser = await User.findOne({ email: req.body.email });
      if (foundUser) {
        const bcryptResponse = await GeneralUtils.validate(
          req.body.password,
          foundUser.password,
        );
        if (bcryptResponse) {
          const {
            id, first_name, last_name, is_admin, email,
          } = foundUser;
          const token = await Auth.signJwt({
            id,
            is_admin,
          });
          return {
            token,
            id,
            first_name,
            last_name,
            email,
            is_admin,
          };
        }
      }
      throw new Error('Invalid credentials');
    } catch (err) {
      throw err;
    }
  }
}

export default UserService;
