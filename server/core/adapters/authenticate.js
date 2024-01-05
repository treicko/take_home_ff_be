import AuthenticateService from "./../services/github/authenticate.js";

const authenticateService = new AuthenticateService();


/**
 * Repository adapter manages service user rest API communication.
 */
export default class AuthenticateAdapter {

  /**
   * Authenticate to github service.
   * @param {String} queryCode Query code to authenticate.
   */
  static authenticate(queryCode) {
    return authenticateService.authenticate(queryCode);
  }
}
