import validator from 'validator';
import spaceTrimer from '../helpers/spaceTrimer';

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
    let {
      firstname, lastname, username, email, password
    } = req.body;
    const errors = {};

    firstname = spaceTrimer(firstname).toLowerCase();
    lastname = spaceTrimer(lastname).toLowerCase();
    username = spaceTrimer(username).toLowerCase();
    email = spaceTrimer(email).toLowerCase();
    password = spaceTrimer(password);

    if (!validator.isAlpha(firstname)) {
      errors.firstname = 'FirstName should be alphabet';
    }
    if (!validator.isLength(firstname, { min: 2, max: 10 })) {
      errors.firstname = 'FirstName should be between 2 and 10 characters';
    }

    if (!validator.isAlpha(lastname)) {
      errors.lastname = 'LastName should be alphabet';
    }
    if (!validator.isLength(lastname, { min: 2, max: 10 })) {
      errors.lastname = 'LastName should be between 2 and 10 characters';
    }

    if (!validator.isAlphanumeric(username)) {
      errors.username = 'Username can only contain alphabet and numbers';
    }
    if (!validator.isLength(username, { min: 3, max: 15 })) {
      errors.username = 'Username should be between 3 and 15 characters';
    }

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
      firstname, lastname, username, email, password
    };
    return next();
  }
}

export default authValidation;
