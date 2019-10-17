import UserService from '../services/user.service';
import CustomResponse from '../utils/response.generator';

const response = new CustomResponse();

class UserController {
  /**
   * @returns {json} json
   * @memberOf UserController
   * @param req
   * @param res
   */

  static async create(req, res) {
    try {
      const user = await UserService.create(req);
      if (user) {
        return response.sendSuccess(res, 200, user);
      }
      return response.sendError(res, 500, 'Something went wrong');
    } catch (err) {
      return response.sendError(res, 400, err.message);
    }
  }

  static async login(req, res) {
    try {
      const user = await UserService.login(req);
      if (user) {
        return response.sendSuccess(res, 200, user);
      }
      return response.sendError(res, 500, 'Something went wrong');
    } catch (err) {
      return response.sendError(res, 400, err.message);
    }
  }
}

export default UserController;
