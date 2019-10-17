import TeamService from '../services/team.service';
import CustomResponse from '../utils/response.generator';

const response = new CustomResponse();

class TeamController {
  /**
   * @returns {json} json
   * @memberOf TeamController
   * @param req
   * @param res
   */

  static async create(req, res) {
    try {
      const team = await TeamService.create(req);
      if (team) {
        return response.sendSuccess(res, 200, team);
      }
      return response.sendError(res, 500, 'Something went wrong');
    } catch (err) {
      return response.sendError(res, 400, err.message);
    }
  }

  static async delete(req, res) {
    try {
      const team = await TeamService.delete(req);
      if (team) {
        return response.sendSuccess(res, 200, team, 'Team successfully deleted');
      }
      return response.sendError(res, 500, 'Something went wrong');
    } catch (err) {
      return response.sendError(res, 404, err.message);
    }
  }

  static async getOne(req, res) {
    try {
      const team = await TeamService.getOne(req);
      if (team) {
        return response.sendSuccess(res, 200, team);
      }
      return response.sendError(res, 500, 'Something went wrong');
    } catch (err) {
      return response.sendError(res, 404, err.message);
    }
  }

  static async getAll(req, res) {
    try {
      const team = await TeamService.getAll(req);
      if (team) {
        return response.sendSuccess(res, 200, team);
      }
      return response.sendError(res, 500, 'Something went wrong');
    } catch (err) {
      return response.sendError(res, 400, err.message);
    }
  }

  static async edit(req, res) {
    try {
      const team = await TeamService.edit(req);
      if (team) {
        return response.sendSuccess(res, 200, team, 'Team successfully edited');
      }
      return response.sendError(res, 500, 'Something went wrong');
    } catch (err) {
      return response.sendError(res, 400, err.message);
    }
  }
}

export default TeamController;
