import axios from "axios";
import { config } from "dotenv";
import { ServiceError } from "./errorHandler.js"

config();

const CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const GITHUB_URL = "https://github.com/login/oauth/access_token";

/**
 * Module for handle user request.
 */
export default class Authenticate {

  /**
   * Gets repositories.
   * @param {String} token authorization token to execute request.
   */
  async authenticate(queryCode) {
    try {
      const response = await axios({
        method: "POST",
        url: `${GITHUB_URL}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${queryCode}`,
        headers: {
          Accept: "application/json",
        },
      });
      return response.data.access_token;
    } catch(error) {
      throw new ServiceError(error);
    }
  }
}
