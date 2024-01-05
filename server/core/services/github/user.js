import { Octokit } from "octokit";
import { ServiceError } from "./errorHandler.js"

import axios from "axios";
import { config } from "dotenv";
config();

/**
 * Module for handle user request.
 */
export default class User {

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
  async authenticate(queryCode) {
    try {
      const githubInstance = this.getConnectionInstance(token);
      const response = await githubInstance.rest.users.getAuthenticated();
      return response.data;
    } catch(error) {
      throw new ServiceError(error);
    }
  }

  /**
   * Gets repositories.
   * @param {String} token authorization token to execute request.
   */
  async getUserInformation(token) {
    try {
      const githubInstance = this.getConnectionInstance(token);
      const response = await githubInstance.rest.users.getAuthenticated();
      return response.data;
    } catch(error) {
      throw new ServiceError(error);
    }
  }
}
