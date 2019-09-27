import User from '../models/User';
import Team from '../models/Team';

/**
 * @class FindItem
 */
class FindItem {
  /**
   * @description Find from User,
   * @param {object} userData
   * @returns {object} User
   * @memberof FindItem
   */
  static async findUser(userData) {
    try {
      const user = await User.find(userData);
      return user;
    } catch (error) {
      /* istanbul ignore next */
      return error;
    }
  }

  /**
   * @description Find from Team,
   * @param {object} teamData
   * @returns {object} User
   * @memberof FindItem
   */
  static async findTeam(teamData) {
    try {
      const team = await Team.find(teamData);
      return team;
    } catch (error) {
      /* istanbul ignore next */
      return error;
    }
  }
}

export default FindItem;
