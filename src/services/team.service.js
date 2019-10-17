/* eslint-disable camelcase */
import Team from '../models/teams.model';

class TeamService {
  /** Add team to the db
   * @description Operate on a team
   * @param req
   */

  static async create(req) {
    try {
      const foundTeam = await Team.findOne({ team_name: req.body.team_name });
      if (foundTeam) {
        throw new Error('Team name is already registered');
      }
      const {
        team_name,
        motto,
        major_trophies,
        location,
        year_founded,
        stadium,
        current_manager,
      } = req.body;
      const newTeam = new Team({
        team_name,
        location,
        year_founded,
        stadium,
        current_manager,
        major_trophies,
        motto,
      });
      await newTeam.save();
      return {
        id: newTeam.id,
        team_name,
        location,
        year_founded,
        stadium,
        current_manager,
        major_trophies,
        motto,
      };
    } catch (err) {
      throw err;
    }
  }

  static async delete(req) {
    try {
      // remove team
      const foundTeam = await Team.findOneAndDelete({ _id: req.params.team_id });
      if (!foundTeam) {
        throw new Error('This team does not exist');
      }
      return foundTeam;
    } catch (err) {
      throw err;
    }
  }

  static async edit(req) {
    try {
      const result = await Team.findOneAndUpdate(
        { _id: req.params.team_id },
        { $set: req.body },
        { new: true },
      );
      if (!result) {
        throw new Error('This team does not exist');
      }
      return result;
    } catch (err) {
      throw err;
    }
  }

  static async getOne(req) {
    try {
      const foundTeam = await Team.findById({ _id: req.params.team_id });
      if (!foundTeam) {
        throw new Error('This team is not registered');
      }
      return foundTeam;
    } catch (err) {
      throw err;
    }
  }

  static async getAll(req) {
    try {
      if (req.query.team_name) {
        const foundTeam = await Team.findOne({
          team_name: req.query.team_name,
        });
        if (!foundTeam) {
          throw new Error(`No ${req.query.status} fixtures`);
        }
        return foundTeam;
      }
      return Team.find();
    } catch (err) {
      throw err;
    }
  }

  static async getNextSequence(key, value) {
    const ret = Team.counters.findAndModify({
      query: { [key]: value },
      update: { $inc: { seq: 1 } },
      new: true,
    });

    return ret.seq;
  }
}

export default TeamService;
