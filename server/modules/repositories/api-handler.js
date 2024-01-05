import RepositoryAdapter from "../../core/adapters/repository.js";

/**
 * Api request Handler.
 */
export default class ApiHandler {

    /**
     * Gets repositories.
     * @param {Object} req object express.
     * @param {Object} res object express.
     */
    static async getRepositories(req, res, next) {
      try {
        const token = req.headers["authorization"];
        const repositories = await RepositoryAdapter.getRepositories(token);
        res.statusCode = 200;
        res.send(repositories);
      } catch (err) {
        next(err);
      }
    }
}
