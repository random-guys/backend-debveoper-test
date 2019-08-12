/* eslint-disable linebreak-style */
import FixtureModel from '../models/Fixture';
import TeamModel from '../models/Team';
import response from '../response';

class FixtureController {
  static async addFixture(req, res) {
    try {
      const homeTeam = req.body.homeTeam.toLowerCase();
      const awayTeam = req.body.awayTeam.toLowerCase();
      const { date, time } = req.body;
      // Determine if the home and away teams exist
      const homeTeamExists = await TeamModel.findTeam(homeTeam);
      const awayTeamExists = await TeamModel.findTeam(awayTeam);
      if (homeTeamExists && awayTeamExists) {
        if (homeTeam !== awayTeam) {
          // Create fixture
          const newFixture = await FixtureModel.addFixture(homeTeam, awayTeam, date, time, 'pending');
          response(res, 201, newFixture);
        } else {
          response(res, 400, 'You cant choose the same team for home and away');
        }
      } else {
        response(res, 400, `The team ${homeTeamExists ? awayTeam : homeTeam} does not exist`);
      }
    } catch (error) {
      response(res, 500, error);
    }
  }

  static async removeFixture(req, res) {
    try {
      // Determine if the fixture exists;
      const { fixtureId } = req.params;
      const fixtureExists = await FixtureModel.findFixture(fixtureId);
      if (fixtureExists) {
        const deletedFixture = await FixtureModel.removeFixture(fixtureId);
        response(res, 200, deletedFixture);
      } else {
        response(res, 400, 'The fixture is not on record');
      }
    } catch (error) {
      response(res, 500, error);
    }
  }
}
export default FixtureController;
