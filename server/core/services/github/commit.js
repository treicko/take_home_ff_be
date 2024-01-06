import { Octokit } from "octokit";
import { ServiceError } from "./errorHandler.js"

/**
 * Module for handle commit request.
 */
export default class Commit {

  constructor() {
    this.defaultHeaders = {
      'X-GitHub-Api-Version': '2022-11-28'
    };
  }

  /**
   * Connect to service by token .
   * @param {String} token authorization token to execute request.
   */
  getConnectionInstance(token) {
    return new Octokit({
      auth: token
    });
  }

  /**
   * Gets commits.
   * @param {Object} data to get authorization token and execute request.
   */
  async getCommitsByRepositoryName({ token, owner, repo }) {
    try {
      const githubInstance = this.getConnectionInstance(token);
      const response = await githubInstance.request(`GET /repos/${owner}/${repo}/commits`, {
        owner: owner,
        repo: repo,
        headers: this.defaultHeaders
      });
      return response.data;
    } catch(error) {
      throw new ServiceError(error);
    }
  }
}
