import ApiHandler from "./api-handler.js";

export default class Api {

  /**
   * Register commits resource.
   * @param {Object} apiMain express api instance.
   */
  static registerModule(apiMain) {

    apiMain.route('/commits/:owner/:repo')
      .get(ApiHandler.getCommits);

  }
}
