/* eslint-disable linebreak-style */
import Joi from '@hapi/joi';

const firstName = Joi.string().min(3).max(15).required();
const lastName = Joi.string().min(3).max(15).required();
const email = Joi.string().email().required();
const password = Joi.string().min(6).max(20).required();

class Validation {
  static signUpValidation(validationObject) {
    const schema = {
      firstName,
      lastName,
      email,
      password,
    };
    return Joi.validate(validationObject, schema);
  }
}

export default Validation;
