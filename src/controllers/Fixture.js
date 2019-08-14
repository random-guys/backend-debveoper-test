/* eslint-disable no-console */
/* eslint-disable camelcase */
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import joi from '@hapi/joi';
import TeamsDB from '../db/TeamsDB';
import FixturesDB from '../db/FixturesDB';
import response from '../response';
import parameters from '../middleware/parameters';

dotenv.config();
class Fixtures {
  static async add(req, res) {
    try {
      if (!req.active.admin) {
        response(res, 'Unauthorised user', 401);
      } else {
        const home_team = req.body.home_team.toLowerCase();
        const away_team = req.body.away_team.toLowerCase();
        const { date, status, scores } = req.body;
        const check1 = await TeamsDB.find(home_team);
        const check2 = await TeamsDB.find(away_team);
        if (check1 && check2) {
          const fixture = {
            home_team,
            away_team,
            date,
            status,
            scores,
          };
          const newFixture = await FixturesDB.add(fixture);
          response(res, { ...newFixture }, 200);
        } else { response(res, 'one or both teams does not exist', 400); }
      }
    } catch (error) { response(res, error, 500); }
  }

  static async viewOne(req, res) {
    try {
      const { id } = req.body;
      const fixture = await FixturesDB.find(id);
      if (fixture) response(res, fixture, 200);
      else response(res, 'fixture does not exist', 401);
    } catch (error) { response(res, error, 500); }
  }

  static async viewAll(req, res) {
    try {
      const fixtures = await FixturesDB.all();
      response(res, fixtures, 200);
    } catch (error) { response(res, error, 500); }
  }

  static async delete(req, res) {
    try {
      if (!req.active.admin) {
        response(res, 'Unauthorised user', 401);
      } else {
        const { id } = req.body;
        await FixturesDB.delete(id);
        response(res, 'fixture successfully deleted', 200);
      }
    } catch (error) { response(res, error, 500); }
  }

  static async change(req, res) {
    try {
      if (!req.active.admin) {
        response(res, 'Unauthorised user', 401);
      } else {
        const { id } = req.params;
        console.log(`#1: ${id}`);
        const member = await FixturesDB.find(id);
        if (!member) {
          response(res, 'fixture does not exist', 400);
        } else {
          const home_team = req.body.home_team.toLowerCase();
          const away_team = req.body.away_team.toLowerCase();
          const { date, status, scores } = req.body;
          const check1 = await TeamsDB.find(home_team);
          const check2 = await TeamsDB.find(away_team);
          if (check1 && check2) {
            const fixture = {
              home_team,
              away_team,
              date,
              status,
              scores,
            };
            await FixturesDB.change(id, fixture);
            response(res, 'fixture updated successfully', 200);
          } else { response(res, 'one or both teams does not exist', 400); }
        }
      }
    } catch (error) { response(res, error, 500); }
  }

  static async filter(req, res) {
    try {
      const { status } = req.params;
      const fixtures = await FixturesDB.filter(status);
      response(res, fixtures, 200);
    } catch (error) { response(res, error, 500); }
  }

  static addChecker(req, res, next) {
    const schema = {
      home_team: parameters.home_team,
      away_team: parameters.away_team,
      date: parameters.date,
      status: parameters.status,
      scores: parameters.scores,
    };

    const {
      home_team,
      away_team,
      date,
      status,
      scores,
    } = req.body;
    const { error } = joi.validate({
      home_team,
      away_team,
      date,
      status,
      scores,
    }, schema);
    if (!error) next();
    else response(res, error, 400);
  }

  static idChecker(req, res, next) {
    const schema = {
      id: parameters.id,
    };
    const { id } = req.body;
    const { error } = joi.validate({ id }, schema);
    if (!error) next();
    else response(res, error, 400);
  }

  static paramChecker(req, res, next) {
    const schema = {
      id: parameters.id,
    };
    const { id } = req.params;
    console.log(id);
    const { error } = joi.validate({ id }, schema);
    if (!error) next();
    else response(res, error, 400);
  }

  static statusChecker(req, res, next) {
    const schema = {
      status: parameters.status,
    };
    const { status } = req.params;
    const { error } = joi.validate({ status }, schema);
    if (!error) next();
    else response(res, error, 400);
  }
}

export default Fixtures;
