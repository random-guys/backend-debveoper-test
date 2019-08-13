/* eslint-disable linebreak-style */
import TeamModel from '../models/Team';
import response from '../response';

class teamController {
  static async addTeam(req, res) {
    try {
      const teamName = req.body.teamName.toLowerCase();
      const { numOfPlayers } = req.body;
      // Determine if a team with the same name already exists;
      const teamExists = await TeamModel.findTeam(teamName);
      if (teamExists) {
        response(res, 400, 'The team already exists');
      } else {
        const newTeam = await TeamModel.addTeam(teamName, numOfPlayers);
        response(res, 201, newTeam);
      }
    } catch (error) {
      response(res, 500, error);
    }
  }

  static async removeTeam(req, res) {
    try {
      const teamName = req.params.teamName.toLowerCase();
      // Determine if a team already exists;
      const teamExists = await TeamModel.findTeam(teamName);
      if (teamExists) {
        const deletedTeam = await TeamModel.removeTeam(teamName);
        response(res, 200, deletedTeam);
      } else {
        response(res, 400, 'The team does not exist');
      }
    } catch (error) {
      response(res, 500, error);
    }
  }

  static async findTeam(req, res) {
    const { teamName } = req.params;
    try {
      const team = await TeamModel.findTeam(teamName);
      if (team) {
        response(res, 200, team);
      } else {
        response(res, 400, 'The team does not exist');
      }
    } catch (error) {
      response(res, 500, error);
    }
  }

  static async updatePlayers(req, res) {
    try {
      const teamName = req.params.teamName.toLowerCase();
      // Determine if a team already exists;
      const teamExists = await TeamModel.findTeam(teamName);
      if (teamExists) {
        const updatedTeam = await TeamModel.updateTeam(teamName, req.body.numOfPlayers);
        response(res, 200, updatedTeam);
      } else {
        response(res, 400, 'The team does not exist');
      }
    } catch (error) {
      response(res, 500, error);
    }
  }

  static async getTeams(req, res) {
    try {
      const teams = await TeamModel.getTeams();
      response(res, 200, teams);
    } catch (error) {
      response(res, 500, error);
    }
  }

  static async publicTeamSearch(req, res) {
    try {
      if (req.query.min_players && req.query.max_players) {
        const teams = await TeamModel.getTeams(req.query.min_players, req.query.max_players);
        response(res, 200, teams);
      } else {
        teamController.getTeams(req, res);
      }
    } catch (error) {
      response(res, 500, error);
    }
  }
}
export default teamController;
