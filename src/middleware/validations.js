/* eslint-disable linebreak-style */
import Joi from '@hapi/joi';
import response from '../response';

const firstName = Joi.string().min(3).max(15).required();
const lastName = Joi.string().min(3).max(15).required();
const email = Joi.string().email().required();
const password = Joi.string().min(6).max(20).required();
const teamName = Joi.string().min(6).max(30).required();

class Validations {
  static signUpValidation(req, res, next) {
    const schema = {
      firstName,
      lastName,
      email,
      password,
    };
    const { error } = Joi.validate({ ...req.body }, schema);
    if (error) {
      response(res, 400, error);
    } else {
      next();
    }
  }

  static signInValidation(req, res, next) {
    const schema = {
      email,
      password,
    };
    const { error } = Joi.validate({ ...req.body }, schema);
    if (error) {
      response(res, 400, error);
    } else {
      next();
    }
  }

  static addTeam(req, res, next) {
    const schema = {
      teamName,
    };
    const { error } = Joi.validate({ ...req.body }, schema);
    if (error) {
      response(res, 400, error);
    } else {
      next();
    }
  }
}

export default Validations;
