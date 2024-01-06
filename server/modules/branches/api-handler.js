import BranchAdapter from "../../core/adapters/branch.js";

/**
 * Api request Handler.
 */
export default class ApiHandler {

    /**
     * Gets repositories.
     * @param {Object} req object express.
     * @param {Object} res object express.
     */
    static async getBranches(req, res, next) {
      try {
        const data = {
          token: req.headers["authorization"],
          owner: req.params.owner,
          repo: req.params.repo
        };
        const branches = await BranchAdapter.getBranches(data);
        res.statusCode = 200;
        res.send(branches);
      } catch (err) {
        next(err);
      }
    }
}
