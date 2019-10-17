import FixtureService from '../services/fixture.service';
import CustomResponse from '../utils/response.generator';

const response = new CustomResponse();

class FixtureController {
  /**
   * @returns {json} json
   * @memberOf FixtureController
   * @param req
   * @param res
   */

  static async create(req, res) {
    try {
      const fixture = await FixtureService.create(req);
      if (fixture) {
        return response.sendSuccess(res, 200, fixture);
      }
      return response.sendError(res, 500, 'Something went wrong');
    } catch (err) {
      return response.sendError(res, 400, err.message);
    }
  }

  static async delete(req, res) {
    try {
      const fixture = await FixtureService.delete(req);
      if (fixture) {
        return response.sendSuccess(
          res,
          200,
          fixture,
          'Fixture successfully deleted',
        );
      }
      return response.sendError(res, 500, 'Something went wrong');
    } catch (err) {
      return response.sendError(res, 404, err.message);
    }
  }

  static async getOne(req, res) {
    try {
      const fixture = await FixtureService.getOne(req);
      if (fixture) {
        return response.sendSuccess(res, 200, fixture);
      }
      return response.sendError(res, 500, 'Something went wrong');
    } catch (err) {
      return response.sendError(res, 404, err.message);
    }
  }

  static async getAll(req, res) {
    try {
      const fixture = await FixtureService.getAll(req);
      if (fixture) {
        return response.sendSuccess(res, 200, fixture);
      }
      return response.sendError(res, 500, 'Something went wrong');
    } catch (err) {
      return response.sendError(res, 400, err.message);
    }
  }

  static async edit(req, res) {
    try {
      const fixture = await FixtureService.edit(req);
      if (fixture) {
        return response.sendSuccess(res, 200, fixture, 'Fixture successfully edited');
      }
      return response.sendError(res, 500, 'Something went wrong');
    } catch (err) {
      return response.sendError(res, 400, err.message);
    }
  }
}

export default FixtureController;
