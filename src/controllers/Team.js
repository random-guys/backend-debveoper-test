/* eslint-disable no-console */
/* eslint-disable camelcase */
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import joi from '@hapi/joi';
import TeamsDB from '../db/TeamsDB';
import response from '../response';
import parameters from '../middleware/parameters';

dotenv.config();
class Team {
  static async add(req, res) {
    try {
      if (!req.active.admin) {
        response(res, 'Unauthorised user', 401);
      } else {
        const team_name = req.body.team_name.toLowerCase();
        console.log(`#1: ${team_name}`);
        const member = await TeamsDB.find(team_name);
        if (!member) {
          const { team_size } = req.body;
          const team = await TeamsDB.add({ team_name, team_size });
          response(res, { ...team }, 200);
        } else {
          response(res, 'team already exists', 400);
        }
      }
    } catch (error) { response(res, error, 500); }
  }

  static async viewAll(req, res) {
    try {
      const team = await TeamsDB.all();
      response(res, team, 200);
    } catch (error) { response(res, error, 500); }
  }

  static async viewOne(req, res) {
    try {
      const team_name = req.params.name.toLowerCase();
      const team = await TeamsDB.find(team_name);
      if (team) response(res, team, 200);
      else response(res, 'team does not exist', 401);
    } catch (error) { response(res, error, 500); }
  }

  static async delete(req, res) {
    try {
      if (!req.active.admin) {
        response(res, 'Unauthorised user', 401);
      } else {
        const team_name = req.body.team_name.toLowerCase();
        await TeamsDB.delete(team_name);
        response(res, `${team_name} successfully deleted`, 200);
      }
    } catch (error) { response(res, error, 500); }
  }

  static async changeName(req, res) {
    try {
      if (!req.active.admin) {
        response(res, 'Unauthorised user', 401);
      } else {
        const old_name = req.params.name.toLowerCase();
        const new_name = req.body.team_name.toLowerCase();
        await TeamsDB.change(old_name, new_name);
        response(res, `${old_name} successfully changed to ${new_name}`, 200);
      }
    } catch (error) { response(res, error, 500); }
  }

  static addChecker(req, res, next) {
    const schema = {
      team_name: parameters.team_name,
      team_size: parameters.team_size,
    };
    const { team_name, team_size } = req.body;

    const { error } = joi.validate({ team_name, team_size }, schema);
    if (!error) next();
    else response(res, error, 400);
  }

  static deleteChecker(req, res, next) {
    const schema = {
      team_name: parameters.team_name,
    };
    const { team_name } = req.body;
    const { error } = joi.validate({ team_name }, schema);
    if (!error) next();
    else response(res, error, 400);
  }

  static nameChecker(req, res, next) {
    const schema = {
      team_name: parameters.team_name,
    };
    const { team_name } = req.body;
    const { error } = joi.validate({ team_name }, schema);
    if (!error) next();
    else response(res, error, 400);
  }

  static paramChecker(req, res, next) {
    const schema = {
      name: parameters.team_name,
    };
    const { name } = req.params;
    const { error } = joi.validate({ name }, schema);
    if (!error) next();
    else response(res, error, 400);
  }
}

export default Team;
