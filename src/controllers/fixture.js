/* eslint-disable linebreak-style */
import FixtureModel from '../models/fixture';
import TeamModel from '../models/team';
import response from '../response';

class FixtureController {
  static async addFixture(req, res) {
    try {
      const homeTeam = req.body.homeTeam.toLowerCase();
      const awayTeam = req.body.awayTeam.toLowerCase();
      const { dateTime } = req.body;
      // Determine if the home and away teams exist
      const homeTeamExists = await TeamModel.findTeam(homeTeam);
      const awayTeamExists = await TeamModel.findTeam(awayTeam);
      if (homeTeamExists && awayTeamExists) {
        if (homeTeam !== awayTeam) {
          // Create fixture
          const newFixture = await FixtureModel.addFixture(homeTeam, awayTeam, dateTime, 'pending');
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

  static async editFixture(req, res) {
    const { fixtureId } = req.params;
    try {
      // Determine if the fixture exists
      const fixtureExists = await FixtureModel.findFixture(fixtureId);
      if (fixtureExists) {
        let whatToEdit;
        let editPayload;
        if (/dateTime/i.test(req.path)) {
          whatToEdit = 'dateTime';
          editPayload = req.body.dateTime;
        } else if (/status/i.test(req.path)) {
          whatToEdit = 'status';
          editPayload = req.body.status;
        } else if (/score/i.test(req.path)) {
          whatToEdit = 'score';
          editPayload = req.body.score;
        }
        const editedFixture = await FixtureModel.editFixture(fixtureId, whatToEdit, editPayload);
        response(res, 200, editedFixture);
      } else {
        response(res, 400, 'The fixture does not exist');
      }
    } catch (error) {
      response(res, 500, error);
    }
  }

  static async getAllFixtures(req, res) {
    try {
      const fixtures = await FixtureModel.getAllFixtures();
      response(res, 200, fixtures);
    } catch (error) {
      response(res, 500, error);
    }
  }

  static async getFixture(req, res) {
    const { fixtureId } = req.params;
    try {
      const fixture = await FixtureModel.findFixture(fixtureId);
      if (fixture) {
        response(res, 200, fixture);
      } else {
        response(res, 400, 'Fixture does not exist');
      }
    } catch (error) {
      response(res, 500, error);
    }
  }

  static async getCompletedOrPendingFixtures(req, res) {
    try {
      const completedOrPending = /completed/i.test(req.path) ? 'completed' : 'pending';
      const fixtures = await FixtureModel.getCompletedOrPendingFixtures(completedOrPending);
      response(res, 200, fixtures);
    } catch (error) {
      response(res, 500, error);
    }
  }

  static async publicFixtureSearch(req, res) {
    try {
      if (req.query.from && req.query.to) {
        const fixtures = await FixtureModel.getAllFixtures(req.query.from, req.query.to);
        response(res, 200, fixtures);
      } else {
        FixtureController.getAllFixtures(req, res);
      }
    } catch (error) {
      response(res, 500, error);
    }
  }
}
export default FixtureController;
