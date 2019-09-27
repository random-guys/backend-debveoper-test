import Fixture from '../models/Fixture';
import Team from '../models/Team';

/**
 * @class searchController
 */
class searchController {
  /**
   * @description Search Controller
   * @param {object} req
   * @param {object} res
   * @returns {object} object
   * @memberof searchController
   */
  static async search(req, res) {
    try {
      const { searchValue } = req.params;
      const results = [];

      const fixtureHomeSearch = await Fixture.find({
        home: searchValue
      });
      const fixtureAwaySearch = await Fixture.find({
        away: searchValue
      });
      const teamSearch = await Team.find({
        team_name: searchValue
      });

      results.push(fixtureHomeSearch, fixtureAwaySearch, teamSearch);

      return res.status(200).json({
        status: 200,
        message: 'Search Data',
        data: results
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

export default searchController;
