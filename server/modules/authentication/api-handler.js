import UserAdapter from "../../core/adapters/user.js";
import AuthenticateAdapter from "../../core/adapters/authenticate.js";

/**
 * Api request Handler.
 */
export default class ApiHandler {

  /**
     * Authenticate to service.
     * @param {Object} req object express.
     * @param {Object} res object express.
     */
  static async authenticate(req, res, next) {
    try {
      const queryCode =  req.query.code
      const token = await AuthenticateAdapter.authenticate(queryCode);
      res.redirect(
        `http://localhost:3000?access_token=${token}`
      );
    } catch (err) {
      next(err);
    }
  }

  /**
   * Gets repositories.
   * @param {Object} req object express.
   * @param {Object} res object express.
   */
  static async getUserData(req, res, next) {
    try {
      const token = req.headers["authorization"];
      const userInfo = await UserAdapter.getUserInformation(token);
      res.statusCode = 200;
      res.send(userInfo);
    } catch (err) {
      next(err);
    }
  }
}
