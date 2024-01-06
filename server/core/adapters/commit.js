import CommitService from "./../services/github/commit.js";

const commitService = new CommitService();


/**
 * Repository adapter manages service rest API communication.
 */
export default class CommitAdapter {

    /**
     * Get commits from service.
     * @param {Object} data Data to get session and execute request to service.
     */
    static async getCommits(data) {
      const commits = await commitService.getCommitsByRepositoryName(data);
      
      return commits.map((commit) => {
        return {
          "message": commit.commit.message,
          "sha": commit.sha
        };
      });
    }
}
