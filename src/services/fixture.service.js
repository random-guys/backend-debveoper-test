/* eslint-disable camelcase */
import Fixture from '../models/fixtures.model';

class FixtureService {
  /** Add fixture to the db
   * @description Operate on a fixture
   * @param req
   */

  static async create(req) {
    try {
      const foundFixture = await Fixture.findOne(
        { team_A: req.body.team_A, team_B: req.body.team_B, date: req.body.date },
      );
      if (foundFixture) {
        throw new Error('There is already a scheduled fixture between the teams on that date');
      }
      const {
        team_A,
        team_B,
        venue,
        date,
        time,
        status,
      } = req.body;
      const newFixture = new Fixture({
        team_A,
        team_B,
        venue,
        date,
        time,
        status,
        scores: '0-0',
      });
      await newFixture.save();
      return {
        id: newFixture.id,
        team_A,
        team_B,
        venue,
        date,
        time,
        status,
      };
    } catch (err) {
      throw err;
    }
  }

  static async delete(req) {
    try {
      // remove fixture
      const foundFixture = await Fixture.findOneAndDelete({ _id: req.params.fixture_id });
      if (!foundFixture) {
        throw new Error('This fixture does not exist');
      }
      return foundFixture;
    } catch (err) {
      throw err;
    }
  }

  static async edit(req) {
    try {
      const result = await Fixture.findOneAndUpdate(
        { _id: req.params.fixture_id },
        { $set: req.body },
        { new: true },
      );
      if (!result) {
        throw new Error('This fixture does not exist');
      }
      return result;
    } catch (err) {
      throw err;
    }
  }

  static async getOne(req) {
    try {
      const foundFixture = await Fixture.findById(
        { _id: req.params.fixture_id },
      );
      if (!foundFixture) {
        throw new Error('This fixture does not exist');
      }
      return foundFixture;
    } catch (err) {
      throw err;
    }
  }

  static async getAll(req) {
    try {
      if (req.query.status) {
        const foundFixture = await Fixture.findOne(
          { status: req.query.status },
        );
        if (!foundFixture) {
          throw new Error(`No ${req.query.status} fixtures`);
        }
        return foundFixture;
      }
      return Fixture.find();
    } catch (err) {
      throw err;
    }
  }
}

export default FixtureService;
