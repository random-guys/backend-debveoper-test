"use strict";

require("core-js/modules/es.promise");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Team = _interopRequireDefault(require("../models/Team"));

var _response = _interopRequireDefault(require("../response"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable linebreak-style */
class teamController {
  static async addTeam(req, res) {
    try {
      const teamName = req.body.teamName.toLowerCase();
      const {
        numOfPlayers
      } = req.body; // Determine if a team with the same name already exists;

      const teamExists = await _Team.default.findTeam(teamName);

      if (teamExists) {
        (0, _response.default)(res, 400, 'The team already exists');
      } else {
        const newTeam = await _Team.default.addTeam(teamName, numOfPlayers);
        (0, _response.default)(res, 201, newTeam);
      }
    } catch (error) {
      (0, _response.default)(res, 500, error);
    }
  }

  static async removeTeam(req, res) {
    try {
      const teamName = req.params.teamName.toLowerCase(); // Determine if a team already exists;

      const teamExists = await _Team.default.findTeam(teamName);

      if (teamExists) {
        const deletedTeam = await _Team.default.removeTeam(teamName);
        (0, _response.default)(res, 200, deletedTeam);
      } else {
        (0, _response.default)(res, 400, 'The team does not exist');
      }
    } catch (error) {
      (0, _response.default)(res, 500, error);
    }
  }

  static async findTeam(req, res) {
    const {
      teamName
    } = req.params;

    try {
      const team = await _Team.default.findTeam(teamName);

      if (team) {
        (0, _response.default)(res, 200, team);
      } else {
        (0, _response.default)(res, 400, 'The team does not exist');
      }
    } catch (error) {
      (0, _response.default)(res, 500, error);
    }
  }

  static async updatePlayers(req, res) {
    try {
      const teamName = req.params.teamName.toLowerCase(); // Determine if a team already exists;

      const teamExists = await _Team.default.findTeam(teamName);

      if (teamExists) {
        const updatedTeam = await _Team.default.updateTeam(teamName, req.body.numOfPlayers);
        (0, _response.default)(res, 200, updatedTeam);
      } else {
        (0, _response.default)(res, 400, 'The team does not exist');
      }
    } catch (error) {
      (0, _response.default)(res, 500, error);
    }
  }

  static async getTeams(req, res) {
    try {
      const teams = await _Team.default.getTeams();
      (0, _response.default)(res, 200, teams);
    } catch (error) {
      (0, _response.default)(res, 500, error);
    }
  }

  static async publicTeamSearch(req, res) {
    try {
      if (req.query.min_players && req.query.max_players) {
        const teams = await _Team.default.getTeams(req.query.min_players, req.query.max_players);
        (0, _response.default)(res, 200, teams);
      } else {
        teamController.getTeams(req, res);
      }
    } catch (error) {
      (0, _response.default)(res, 500, error);
    }
  }

}

var _default = teamController;
exports.default = _default;