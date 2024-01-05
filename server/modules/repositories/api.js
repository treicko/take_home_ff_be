import ApiHandler from "./api-handler.js";

export default class Api {

  /**
   * Register repositories resource.
   * @param {Object} apiMain express api instance.
   */
  static registerModule(apiMain) {

    apiMain.route('/repositories')
      .get(ApiHandler.getRepositories);

  }
}