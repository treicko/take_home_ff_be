import RepositoryService from "./../services/github/repository.js";

const repositoryService = new RepositoryService();


/**
 * Repository adapter manages service rest API communication.
 */
export default class BranchAdapter {

    /**
     * Get branches from service.
     * @param {Object} data Data to get session and execute request to service.
     */
    static async getBranches(data) {
      return await repositoryService.getBranchesByRepositoryName(data);
    }
}
