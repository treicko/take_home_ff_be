import CommitAdapter from "../../core/adapters/commit.js";

/**
 * Api request Handler.
 */
export default class ApiHandler {

    /**
     * Gets repositories.
     * @param {Object} req object express.
     * @param {Object} res object express.
     */
    static async getCommits(req, res, next) {
      try {
        const data = {
          token: req.headers["authorization"],
          owner: req.params.owner,
          repo: req.params.repo
        };
        const commits = await CommitAdapter.getCommits(data);
        res.statusCode = 200;
        res.send(commits);
      } catch (err) {
        next(err);
      }
    }
}
