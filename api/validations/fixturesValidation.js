import validator from 'validator';

/**
 * @description Fixtures Validation
 * @class FixtureValidation
 */
class FixtureValidation {
  /**
   * @description Create Fixture Validation
   * @static
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns {object} validation
   * @memberof FixtureValidation
   */
  static createFixtureValidation(req, res, next) {
    let { home, away } = req.body;
    const errors = {};
    const alphabetRegex = /^[A-Za-z ]+$/;

    home = home.toLowerCase();
    away = away.toLowerCase();

    if (!alphabetRegex.test(home)) {
      errors
        .home = 'Home Team should be an alphabet';
    }

    if (!validator.isLength(home, { min: 5, max: 30 })) {
      errors
        .home = 'Home Team should be at least 5 and 30 characters long';
    }

    if (!alphabetRegex.test(away)) {
      errors
        .away = 'Away Team should be an alphabet';
    }

    if (!validator.isLength(away, { min: 5, max: 30 })) {
      errors
        .away = 'Away Team should be at least 5 and 30 characters long';
    }

    if (Object.keys(errors).length !== 0) {
      return res.status(400).json({
        status: 400,
        message: 'Fields are required',
        data: errors
      });
    }

    res.locals.fixture = {
      home, away
    };
    return next();
  }

  /**
   * @description Edit Fixture Validation
   * @static
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns {object} validation
   * @memberof FixtureValidation
   */
  static editFixtureValidation(req, res, next) {
    let { home, away } = req.body;
    const errors = {};
    const alphabetRegex = /^[A-Za-z ]+$/;

    home = home.toLowerCase();
    away = away.toLowerCase();

    if (home !== '') {
      if (!alphabetRegex.test(home)) {
        errors
          .home = 'Home Team should be an alphabet';
      }

      if (!validator.isLength(home, { min: 5, max: 30 })) {
        errors
          .home = 'Home Team should be at least 5 and 30 characters long';
      }
    }

    if (away !== '') {
      if (!alphabetRegex.test(away)) {
        errors
          .away = 'Away Team should be an alphabet';
      }

      if (!validator.isLength(away, { min: 5, max: 30 })) {
        errors
          .away = 'Away Team should be at least 5 and 30 characters long';
      }
    }

    if (Object.keys(errors).length !== 0) {
      return res.status(400).json({
        status: 400,
        message: 'Fields are required',
        data: errors
      });
    }

    res.locals.fixture = {
      home, away
    };
    return next();
  }
}

export default FixtureValidation;
