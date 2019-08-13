/* eslint-disable linebreak-style */
import joi from '@hapi/joi';

const params = {
  first_name: joi.string().min(3).max(15).required(),
  last_name: joi.string().min(3).max(15).required(),
  email: joi.string().email().required(),
  password: joi.string().min(6).max(20).required(),
  team_name: joi.string().min(4).max(30).required(),
  team_size: joi.number().integer().min(12).max(25),
  home_team: joi.string().min(4).max(30).required(),
  away_team: joi.string().min(4).max(30).required(),
  date: joi.date().iso().required(),
  id: joi.string().min(6).max(30).required(),
  status: joi.string().valid('completed', 'pending').required(),

};

export default params;
