import { Octokit } from "octokit";
import { ServiceError } from "./errorHandler.js"

/**
 * Module for handle repository request.
 */
export default class Repository {

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
   * Gets repositories.
   * @param {String} token authorization token to execute request.
   */
  async getRepositories(token) {
    try {
      const githubInstance = this.getConnectionInstance(token);
      const response = await githubInstance.request('GET /user/repos', {
        headers: this.defaultHeaders,
        sort: "updated",
        direction: "desc"
      });
      return response.data;
    } catch(error) {
      throw new ServiceError(error);
    }
  }

  /**
   * Gets repositories.
   * @param {Object} data to get authorization token and execute request.
   */
  async getBranchesByRepositoryName({ token, owner, repo }) {
    try {
      const githubInstance = this.getConnectionInstance(token);
      const response = await githubInstance.request(`GET /repos/${owner}/${repo}/branches`, {
        owner: owner,
        repo: repo,
        headers: this.defaultHeaders
      })
      return response.data;
    } catch(error) {
      throw new ServiceError(error);
    }
  }
}
