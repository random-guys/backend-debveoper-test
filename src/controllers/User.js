/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
/* eslint-disable camelcase */
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import joi from '@hapi/joi';
import usersDB from '../db/UsersDB';
import response from '../response';
import parameters from '../middleware/parameters';

dotenv.config();
class User {
  static async signup(req, res) {
    try {
      const { first_name, last_name, password } = req.body;
      const email = req.body.email.replace(/\s/g, '').toLowerCase();
      const member = await usersDB.find(email);
      if (member) {
        response(res, 'User exists', 400);
      } else {
        const admin = false;
        const hashPass = await bcrypt.hash(password, 10);
        const createdUser = {
          email,
          first_name,
          last_name,
          password: hashPass,
          admin,
        };
        const newUser = await usersDB.create(createdUser);
        newUser.token = jwt.sign(
          { id: newUser._id, email, admin },
          process.env.PRIVATE_KEY,
          { expiresIn: '1000h' },
        );
        response(res, { ...newUser }, 200);
      }
    } catch (error) {
      response(res, error, 500);
    }
  }

  static async signin(req, res) {
    try {
      console.log(`#1: ${req.path}`);
      // get password from request body
      const { password } = req.body;
      // get email from client
      const email = req.body.email.replace(/\s/g, '').toLowerCase();
      // check if user is in database and
      const member = await usersDB.find(email);
      if (!member) {
        // throw error since email isn't in server
        response(res, 'Email does not exist', 401);
      } else {
        // compare input password with hashed password
        const passwordMatch = await bcrypt.compare(password, member.password);
        // if password doesn't match, throw an error
        if (!passwordMatch) {
          response(res, 'invalid password entered', 401);
        } else {
          member.token = jwt.sign(
            { id: member._id, email, admin: member.admin },
            process.env.PRIVATE_KEY,
            { expiresIn: '1000h' },
          );
          response(res, member, 200);
        }
      }
    } catch (error) {
      response(res, error, 500);
    }
  }

  // validations and checkers for user
  static signupCheck(req, res, next) {
    const schema = {
      first_name: parameters.first_name,
      last_name: parameters.last_name,
      email: parameters.email,
      password: parameters.password,
    };
    const { error } = joi.validate({ ...req.body }, schema);
    if (!error) next();
    else response(res, error, 400);
  }

  static signinCheck(req, res, next) {
    const schema = {
      email: parameters.email,
      password: parameters.password,
    };
    const { error } = joi.validate({ ...req.body }, schema);
    if (!error) next();
    else response(res, error, 400);
  }

  static async checkToken(req, res, next) {
    const { token } = req.body;
    console.log(`#2: ${token}`);
    if (token) {
      try {
        req.active = await jwt.verify(token, process.env.PRIVATE_KEY);
        next();
      } catch (error) {
        response(res, error, 500);
      }
    } else {
      response(res, 'Token is not present', 401);
    }
  }

}
export default User;
