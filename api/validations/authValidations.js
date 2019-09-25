import validator from 'validator';
import spaceTrimer from '../helpers/spaceTrimer';
import fieldsValidate from './fieldsValidation';

/**
 * @description Auth Validation
 * @class authValidation
 */
class authValidation {
  /**
   * @description Signup Validation
   * @static
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns {object} validation
   * @memberof authValidation
   */
  static signupValidation(req, res, next) {
    const inputErrors = {};

    const { errors, newData } = fieldsValidate(req.body);

    if (errors.firstname !== undefined) {
      inputErrors.firstname = errors.firstname;
    }
    if (errors.lastname !== undefined) {
      inputErrors.lastname = errors.lastname;
    }
    if (errors.username !== undefined) {
      inputErrors.username = errors.username;
    }
    if (errors.email !== undefined) {
      inputErrors.email = errors.email;
    }
    if (errors.password !== undefined) {
      inputErrors.password = errors.password;
    }

    if (Object.keys(inputErrors).length !== 0) {
      return res.status(400).json({
        status: 400,
        message: 'Fields are required',
        data: inputErrors
      });
    }

    res.locals.userInputData = { newData };
    return next();
  }

  /**
   * @description Signin Validation
   * @static
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns {object} validation
   * @memberof authValidation
   */
  static signinValidation(req, res, next) {
    let {
      email, password
    } = req.body;
    const errors = {};

    email = spaceTrimer(email).toLowerCase();
    password = spaceTrimer(password);

    if (!validator.isEmail(email)) {
      errors.email = 'Please put in a valid email';
    }

    if (!validator.isLength(password, { min: 7 })) {
      errors.password = 'Password should be at least 7 characters long';
    }

    if (Object.keys(errors).length !== 0) {
      return res.status(400).json({
        status: 400,
        message: 'Fields are required',
        data: errors
      });
    }

    res.locals.userInputData = {
      email, password
    };
    return next();
  }

  /**
   * @description Admin Signup Validation
   * @static
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns {object} validation
   * @memberof authValidation
   */
  static adminSignupValidation(req, res, next) {
    const inputErrors = {};

    const { errors, newData } = fieldsValidate(req.body);
    const role = spaceTrimer(newData.role).toLowerCase();

    if (errors.firstname !== undefined) {
      inputErrors.firstname = errors.firstname;
    }
    if (errors.lastname !== undefined) {
      inputErrors.lastname = errors.lastname;
    }
    if (errors.username !== undefined) {
      inputErrors.username = errors.username;
    }
    if (errors.email !== undefined) {
      inputErrors.email = errors.email;
    }
    if (errors.password !== undefined) {
      inputErrors.password = errors.password;
    }

    if (!validator.isBoolean(role)) {
      inputErrors.role = 'Role should be a boolean (true / fale)';
    }

    if (Object.keys(inputErrors).length !== 0) {
      return res.status(400).json({
        status: 400,
        message: 'Fields are required',
        data: inputErrors
      });
    }

    res.locals.userInputData = { newData, role };
    return next();
  }
}

export default authValidation;
