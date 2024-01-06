import ApiHandler from "./api-handler.js";

export default class Api {

  /**
   * Register repositories resource.
   * @param {Object} apiMain express api instance.
   */
  static registerModule(apiMain) {
    apiMain.get("/oauth/redirect", ApiHandler.authenticate);
    apiMain.get("/user/data", ApiHandler.getUserData);
  }
}