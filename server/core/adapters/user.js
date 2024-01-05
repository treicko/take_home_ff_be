import UserService from "./../services/github/user.js";

const userService = new UserService();


/**
 * Repository adapter manages service user rest API communication.
 */
export default class UserAdapter {

  /**
   * Get repositories from service.
   * @param {String} token session to execute request to service.
   */
  static authenticate(queryCode) {
    return userService.authenticate(queryCode);
  }

  /**
   * Get repositories from service.
   * @param {String} token session to execute request to service.
   */
  static getUserInformation(token) {
    return userService.getUserInformation(token);
  }
}
