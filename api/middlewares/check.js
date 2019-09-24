import bcrypt from 'bcryptjs';
import findItem from '../helpers/findItem';

const { findUser } = findItem;

/**
 * @class Check
 */
class Check {
  /**
   * @description Check if email exist
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns {object} respone
   * @memberof Check
   */
  static async emailExist(req, res, next) {
    try {
      const { email } = res.locals.userInputData;
      const emailExist = await findUser({ email });

      if (emailExist.length !== 0) {
        return res.status(409).json({
          status: 409,
          message: 'Email error',
          data: { email: 'Email already exist' }
        });
      }

      return next();
    } catch (error) {
      /* istanbul ignore next */
      return res.status(500).json({
        status: 500,
        message: error.message
      });
    }
  }

  /**
   * @description Check if email dont exist
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns {object} respone
   * @memberof Check
   */
  static async emailDontExist(req, res, next) {
    try {
      const { email } = res.locals.userInputData;
      const emailExist = await findUser({ email });

      if (emailExist.length === 0) {
        return res.status(404).json({
          status: 404,
          message: 'Email error',
          data: { email: 'Email does not exist' }
        });
      }

      return next();
    } catch (error) {
      /* istanbul ignore next */
      return res.status(500).json({
        status: 500,
        message: error.message
      });
    }
  }

  /**
   * @description Check if username exist
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns {object} respone
   * @memberof Check
   */
  static async usernameExist(req, res, next) {
    try {
      const { username } = res.locals.userInputData;
      const usernameExist = await findUser({ username });

      if (usernameExist.length !== 0) {
        return res.status(409).json({
          status: 409,
          message: 'Username error',
          data: { username: 'Username already exist' }
        });
      }

      return next();
    } catch (error) {
      /* istanbul ignore next */
      return res.status(500).json({
        status: 500,
        message: error.message
      });
    }
  }

  /**
   * @description Compare Password
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns {object} respone
   * @memberof Check
   */
  static async comparePassword(req, res, next) {
    try {
      const { email, password } = res.locals.userInputData;
      const user = await findUser({ email });

      const validPassword = bcrypt.compareSync(password, user[0].password);

      if (!validPassword) {
        return res.status(400).json({
          status: 400,
          message: 'Password error',
          data: { password: 'Password is incorrect' }
        });
      }

      res.locals.user = user;
      return next();
    } catch (error) {
      /* istanbul ignore next */
      return res.status(500).json({
        status: 500,
        message: error.message
      });
    }
  }
}

export default Check;
