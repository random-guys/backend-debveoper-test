/* eslint-disable linebreak-style */
import TeamModel from '../models/Team';
import response from '../response';

class teamController {
  static async addTeam(req, res) {
    try {
      const teamName = req.body.teamName.toLowerCase();
      // Determine if a team with the same name already exists;
      const teamExists = await TeamModel.findTeam(teamName);
      if (teamExists) {
        response(res, 400, 'The team already exists');
      } else {
        const newTeam = await TeamModel.addTeam(teamName);
        response(res, 201, newTeam);
      }
    } catch (error) {
      response(res, 500, error);
    }
  }
}
export default teamController;
