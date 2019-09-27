/* eslint-disable camelcase */
import Team from '../models/Team';

/**
 * @class TeamController
 */
class TeamController {
  /**
   * @description Add teams Controller
   * @param {object} req
   * @param {object} res
   * @returns {object} object
   * @memberof TeamController
   */
  static async addTeam(req, res) {
    try {
      const { shortName, teamName } = res.locals.team;
      const team = await new Team({
        short_name: shortName,
        team_name: teamName,
      });
      team.save();
      return res.status(201).json({
        status: 201,
        message: 'Team successfully added'
      });
    } catch (error) {
      /* istanbul ignore next */
      return res.status(500).json({
        status: 500,
        message: error.message
      });
    }
  }

  /**
   * @description Edit Team Controller
   * @param {object} req
   * @param {object} res
   * @returns {object} object
   * @memberof TeamController
   */
  static async editTeam(req, res) {
    try {
      const { shortName, teamName } = res.locals.team;
      const {
        _id,
        short_name: shortNameData,
        team_name: teamNameData
      } = res.locals.teamData[0];

      const short_name = shortName || shortNameData;
      const team_name = teamName || teamNameData;

      const team = await Team.findByIdAndUpdate(_id, {
        short_name,
        team_name
      });
      team.save();
      return res.status(200).json({
        status: 200,
        message: 'Team successfully updated'
      });
    } catch (error) {
      /* istanbul ignore next */
      return res.status(500).json({
        status: 500,
        message: error.message
      });
    }
  }

  /**
   * @description Remove Team Controller
   * @param {object} req
   * @param {object} res
   * @returns {object} object
   * @memberof TeamController
   */
  static async removeTeam(req, res) {
    try {
      const {
        _id
      } = res.locals.teamData[0];

      const team = await Team.findOneAndRemove({ _id });
      team.save();
      return res.status(200).json({
        status: 200,
        message: 'Team successfully removed'
      });
    } catch (error) {
      /* istanbul ignore next */
      return res.status(500).json({
        status: 500,
        message: error.message
      });
    }
  }

  /**
   * @description View Specific Team Controller
   * @param {object} req
   * @param {object} res
   * @returns {object} object
   * @memberof TeamController
   */
  static async viewTeam(req, res) {
    try {
      const {
        _id
      } = res.locals.teamData[0];
      const team = await Team.findById(_id);

      return res.status(200).json({
        status: 200,
        message: `View ${team.team_name.toUpperCase()}`,
        data: team
      });
    } catch (error) {
      /* istanbul ignore next */
      return res.status(500).json({
        status: 500,
        message: error.message
      });
    }
  }

  /**
   * @description View all Teams Controller
   * @param {object} req
   * @param {object} res
   * @returns {object} object
   * @memberof TeamController
   */
  static async viewAllTeam(req, res) {
    try {
      const allTeams = await Team.find({});
      return res.status(200).json({
        status: 200,
        message: 'All Teams',
        data: allTeams
      });
    } catch (error) {
      /* istanbul ignore next */
      return res.status(500).json({
        status: 500,
        message: error.message
      });
    }
  }
}

export default TeamController;
