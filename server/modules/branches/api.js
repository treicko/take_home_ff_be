import ApiHandler from "./api-handler.js";

export default class Api {

  /**
   * Register branches resource.
   * @param {Object} apiMain express api instance.
   */
  static registerModule(apiMain) {

    apiMain.route('/branches/:owner/:repo')
      .get(ApiHandler.getBranches);

  }
}