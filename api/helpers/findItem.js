import User from '../models/User';

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
}

export default FindItem;
