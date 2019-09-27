import validator from 'validator';
import spaceTrimer from '../helpers/spaceTrimer';

/**
 * @description Team Validation
 * @class teamValidation
 */
class teamValidation {
  /**
   * @description Create Team Validation
   * @static
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns {object} validation
   * @memberof teamValidation
   */
  static createTeamValidation(req, res, next) {
    let { shortName, teamName } = req.body;
    const errors = {};
    const alphabetRegex = /^[A-Za-z ]+$/;

    shortName = spaceTrimer(shortName).toLowerCase();
    teamName = teamName.toLowerCase();

    if (!validator.isAlpha(shortName)) {
      errors
        .shortName = 'Short Name should be an alphabet';
    }

    if (!validator.isLength(shortName, { min: 2, max: 10 })) {
      errors
        .shortName = 'Short Name should be at least 2 and 10 characters long';
    }

    if (!alphabetRegex.test(teamName)) {
      errors
        .teamName = 'Team Name should be an alphabet';
    }

    if (!validator.isLength(teamName, { min: 5, max: 30 })) {
      errors
        .teamName = 'Team Name should be at least 5 and 30 characters long';
    }

    if (Object.keys(errors).length !== 0) {
      return res.status(400).json({
        status: 400,
        message: 'Fields are required',
        data: errors
      });
    }

    res.locals.team = {
      shortName, teamName
    };
    return next();
  }

  /**
   * @description Edit Team Validation
   * @static
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns {object} validation
   * @memberof teamValidation
   */
  static editTeamValidation(req, res, next) {
    let { shortName, teamName } = req.body;
    const errors = {};
    const alphabetRegex = /^[A-Za-z ]+$/;

    shortName = spaceTrimer(shortName).toLowerCase();
    teamName = teamName.toLowerCase();

    if (shortName !== '') {
      if (!validator.isAlpha(shortName)) {
        errors
          .shortName = 'Short Name should be an alphabet';
      }

      if (!validator.isLength(shortName, { min: 2, max: 10 })) {
        errors
          .shortName = 'Short Name should be at least 2 and 10 characters long';
      }
    }

    if (teamName !== '') {
      if (!alphabetRegex.test(teamName)) {
        errors
          .teamName = 'Team Name should be an alphabet';
      }

      if (!validator.isLength(teamName, { min: 5, max: 30 })) {
        errors
          .teamName = 'Team Name should be at least 5 and 30 characters long';
      }
    }

    if (Object.keys(errors).length !== 0) {
      return res.status(400).json({
        status: 400,
        message: 'Fields are required',
        data: errors
      });
    }

    res.locals.team = {
      shortName, teamName
    };
    return next();
  }
}

export default teamValidation;
