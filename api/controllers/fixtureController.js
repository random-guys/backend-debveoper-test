import short from 'short-uuid';
import Fixture from '../models/Fixture';
import fixtureObject from '../helpers/fixtureObject';
import spaceTrimmer from '../helpers/spaceTrimer';

/**
 * @class FixtureController
 */
class FixtureController {
  /**
   * @description Add fixtures Controller
   * @param {object} req
   * @param {object} res
   * @returns {object} object
   * @memberof FixtureController
   */
  static async addFixture(req, res) {
    try {
      const { home, away } = res.locals.fixture;
      const today = new Date();
      const fixture = new Fixture({
        home,
        away,
        fixture: `${home} vs ${away}`,
        fixture_link: `${spaceTrimmer(home).toLowerCase()}-vs-${spaceTrimmer(away).toLowerCase()}-${short.generate()}`,
        match_date: today
      });
      fixture.save();

      const data = fixtureObject(fixture);
      return res.status(201).json({
        status: 201,
        message: 'Fixture Created Successfully',
        data
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
   * @description Edit Fixture Controller
   * @param {object} req
   * @param {object} res
   * @returns {object} object
   * @memberof FixtureController
   */
  static async editFixture(req, res) {
    try {
      const { home, away } = res.locals.fixture;
      const {
        _id,
        home: homeData,
        away: awayData
      } = res.locals.fixtureData[0];

      const homeTeam = home || homeData;
      const awayTeam = away || awayData;

      const fixture = await Fixture.findByIdAndUpdate(_id, {
        home: homeTeam,
        away: awayTeam,
        fixture: `${homeTeam} vs ${awayTeam}`,
        fixture_link: `${spaceTrimmer(homeTeam).toLowerCase()}-vs-${spaceTrimmer(awayTeam).toLowerCase()}-${short.generate()}`,
      });
      fixture.save();
      return res.status(200).json({
        status: 200,
        message: 'Fixture successfully updated'
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
   * @description Remove Fixture Controller
   * @param {object} req
   * @param {object} res
   * @returns {object} object
   * @memberof FixtureController
   */
  static async removeFixture(req, res) {
    try {
      const {
        _id
      } = res.locals.fixtureData[0];

      const fixture = await Fixture.findOneAndRemove({ _id });
      fixture.save();
      return res.status(200).json({
        status: 200,
        message: 'Fixture successfully removed'
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
   * @description View Specific Fixture Controller
   * @param {object} req
   * @param {object} res
   * @returns {object} object
   * @memberof FixtureController
   */
  static async viewFixture(req, res) {
    try {
      const data = fixtureObject(res.locals.fixtureData[0]);
      return res.status(200).json({
        status: 200,
        message: 'View Specific Fixture',
        data
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
   * @description View all Fixtures Controller
   * @param {object} req
   * @param {object} res
   * @returns {object} object
   * @memberof FixtureController
   */
  static async viewAllFixtures(req, res) {
    try {
      const allFixtures = await Fixture.find({});

      const data = [];
      allFixtures.map((fixture) => {
        const fix = fixtureObject(fixture);
        data.push(fix);
      });
      return res.status(200).json({
        status: 200,
        message: 'All Fixtures',
        data
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
   * @description View all Completed Fixtures Controller
   * @param {object} req
   * @param {object} res
   * @returns {object} object
   * @memberof FixtureController
   */
  static async viewCompletedFixtures(req, res) {
    try {
      const allFixtures = await Fixture.find({});

      const data = [];
      allFixtures.map((fixture) => {
        const matchDate = new Date(fixture.match_date);
        const now = new Date();
        if (matchDate < now) {
          const fix = fixtureObject(fixture);
          data.push(fix);
        }
      });
      return res.status(200).json({
        status: 200,
        message: 'All Completed Fixtures',
        data
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
   * @description View all Pending Fixtures Controller
   * @param {object} req
   * @param {object} res
   * @returns {object} object
   * @memberof FixtureController
   */
  static async viewPendingFixtures(req, res) {  
    try {
      const allFixtures = await Fixture.find({});

      const data = [];
      allFixtures.map((fixture) => {
        const matchDate = new Date(fixture.match_date);
        const now = new Date();
        if (matchDate > now) {
          const fix = fixtureObject(fixture);
          data.push(fix);
        }
      });
      return res.status(200).json({
        status: 200,
        message: 'All Pending Fixtures',
        data
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
   * @description View Specific Fixture Controller
   * @param {object} req
   * @param {object} res
   * @returns {object} object
   * @memberof FixtureController
   */
  static async fixtureLink(req, res) {
    try {
      const data = fixtureObject(res.locals.fixtureData[0]);
      return res.status(200).json({
        status: 200,
        message: 'View Specific Fixture',
        data
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

export default FixtureController;
