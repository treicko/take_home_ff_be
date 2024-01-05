import RepositoryService from "./../services/github/repository.js";

const repositoryService = new RepositoryService();


/**
 * Repository adapter manages service rest API communication.
 */
export default class RepositoryAdapter {

    /**
     * Get repositories from service.
     * @param {String} token session to execute request to service.
     */
    static async getRepositories(token) {
      const repositories = await repositoryService.getRepositories(token);
      return repositories.map((repository) => {
          return {
            "name": repository.name,
            "description": repository.description,
            "updated_at": repository.updated_at,
            "language": repository.language,
            "visibility": repository.visibility,
            "watchers": repository.watchers
          };
      });;
    }
}
