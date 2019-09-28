import bcrypt from 'bcryptjs';
import findItem from '../helpers/findItem';

const { findUser, findTeam, findFixture } = findItem;

/**
 * @class Check
 */
class Check {
  /**
   * @description Check if email exist
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns {object} respone
   * @memberof Check
   */
  static async emailExist(req, res, next) {
    try {
      const { newData: { email } } = res.locals.userInputData;
      const emailExist = await findUser({ email });

      if (emailExist.length !== 0) {
        return res.status(409).json({
          status: 409,
          message: 'Email error',
          data: { email: 'Email already exist' }
        });
      }

      return next();
    } catch (error) {
      /* istanbul ignore next */
      return res.status(500).json({
        status: 500,
        message: error.message
      });
    }
  }

  /**
   * @description Check if email dont exist
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns {object} respone
   * @memberof Check
   */
  static async emailDontExist(req, res, next) {
    try {
      const { email } = res.locals.userInputData;
      const emailExist = await findUser({ email });

      if (emailExist.length === 0) {
        return res.status(404).json({
          status: 404,
          message: 'Email error',
          data: { email: 'Email does not exist' }
        });
      }

      return next();
    } catch (error) {
      /* istanbul ignore next */
      return res.status(500).json({
        status: 500,
        message: error.message
      });
    }
  }

  /**
   * @description Check if admin
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns {object} respone
   * @memberof Check
   */
  static async checkIfAdmin(req, res, next) {
    try {
      const { email } = res.locals.userInputData;
      const emailExist = await findUser({ email });

      if (!emailExist[0].admin) {
        return res.status(401).json({
          status: 401,
          message: 'Unauthorized Account',
        });
      }

      return next();
    } catch (error) {
      /* istanbul ignore next */
      return res.status(500).json({
        status: 500,
        message: error.message
      });
    }
  }

  /**
   * @description Check if username exist
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns {object} respone
   * @memberof Check
   */
  static async usernameExist(req, res, next) {
    try {
      const { newData: { username } } = res.locals.userInputData;
      const usernameExist = await findUser({ username });

      if (usernameExist.length !== 0) {
        return res.status(409).json({
          status: 409,
          message: 'Username error',
          data: { username: 'Username already exist' }
        });
      }

      return next();
    } catch (error) {
      /* istanbul ignore next */
      return res.status(500).json({
        status: 500,
        message: error.message
      });
    }
  }

  /**
   * @description Compare Password
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns {object} respone
   * @memberof Check
   */
  static async comparePassword(req, res, next) {
    try {
      const { email, password } = res.locals.userInputData;
      const user = await findUser({ email });

      const validPassword = bcrypt.compareSync(password, user[0].password);

      if (!validPassword) {
        return res.status(400).json({
          status: 400,
          message: 'Password error',
          data: { password: 'Password is incorrect' }
        });
      }

      res.locals.user = user;
      return next();
    } catch (error) {
      /* istanbul ignore next */
      return res.status(500).json({
        status: 500,
        message: error.message
      });
    }
  }

  /**
   * @description Check if team name exist
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns {object} respone
   * @memberof Check
   */
  static async teamNameExist(req, res, next) {
    try {
      const { teamName } = res.locals.team;
      const teamExist = await findTeam({
        team_name: teamName
      });

      if (teamExist.length !== 0) {
        return res.status(409).json({
          status: 409,
          message: 'Team error',
          data: { teamName: 'Team Name already exist' }
        });
      }

      return next();
    } catch (error) {
      /* istanbul ignore next */
      return res.status(500).json({
        status: 500,
        message: error.message
      });
    }
  }

  /**
   * @description Check if team name don't exist
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns {object} respone
   * @memberof Check
   */
  static async teamNameDontExist(req, res, next) {
    try {
      const { home, away } = res.locals.fixture;
      const homeExist = await findTeam({
        team_name: home
      });

      if (homeExist.length === 0 && home !== '') {
        return res.status(404).json({
          status: 404,
          message: 'Team error',
          data: { home: `${home} dont exist` }
        });
      }

      const awayExist = await findTeam({
        team_name: away
      });

      if (awayExist.length === 0 && away !== '') {
        return res.status(404).json({
          status: 404,
          message: 'Team error',
          data: { away: `${away} dont exist` }
        });
      }

      return next();
    } catch (error) {
      /* istanbul ignore next */
      return res.status(500).json({
        status: 500,
        message: error.message
      });
    }
  }

  /**
   * @description Check if team name exist
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns {object} respone
   * @memberof Check
   */
  static async teamShortNameExist(req, res, next) {
    try {
      const { shortName } = res.locals.team;
      const shortNameExist = await findTeam({
        short_name: shortName
      });

      if (shortNameExist.length !== 0) {
        return res.status(409).json({
          status: 409,
          message: 'Team error',
          data: { shortName: 'Short Name already exist' }
        });
      }

      return next();
    } catch (error) {
      /* istanbul ignore next */
      return res.status(500).json({
        status: 500,
        message: error.message
      });
    }
  }

  /**
   * @description Check if team valid
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns {object} respone
   * @memberof Check
   */
  static async teamValid(req, res, next) {
    try {
      const { shortName } = req.params;
      const shortNameExist = await findTeam({
        short_name: shortName
      });

      if (shortNameExist.length === 0) {
        return res.status(404).json({
          status: 404,
          message: 'Team does not exist'
        });
      }

      res.locals.teamData = shortNameExist;
      return next();
    } catch (error) {
      /* istanbul ignore next */
      return res.status(500).json({
        status: 500,
        message: error.message
      });
    }
  }

  /**
   * @description Check if fixture valid
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns {object} respone
   * @memberof Check
   */
  static async fixtureValid(req, res, next) {
    try {
      const { fixtureId } = req.params;
      const fixtureExist = await findFixture({
        _id: fixtureId
      });

      if (fixtureExist.length === 0) {
        return res.status(404).json({
          status: 404,
          message: 'Fixture does not exist'
        });
      }

      res.locals.fixtureData = fixtureExist;
      return next();
    } catch (error) {
      /* istanbul ignore next */
      return res.status(500).json({
        status: 500,
        message: error.message
      });
    }
  }

  /**
   * @description Check if fixture generated link valid
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns {object} respone
   * @memberof Check
   */
  static async fixtureGeneratedLinkValid(req, res, next) {
    try {
      const { fixtureLink } = req.params;
      const fixtureExist = await findFixture({
        fixture_link: fixtureLink
      });

      if (fixtureExist.length === 0) {
        return res.status(400).json({
          status: 400,
          message: 'Invalid fixture link'
        });
      }

      res.locals.fixtureData = fixtureExist;
      return next();
    } catch (error) {
      /* istanbul ignore next */
      return res.status(500).json({
        status: 500,
        message: error.message
      });
    }
  }
}

export default Check;
