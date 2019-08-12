/* eslint-disable linebreak-style */
import joi from '@hapi/joi';

const params = {
  first_name: joi.string().min(3).max(15).required(),
  last_name: joi.string().min(3).max(15).required(),
  email: joi.string().email().required(),
  password: joi.string().min(6).max(20).required(),
};

export default params;
