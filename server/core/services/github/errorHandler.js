
/**
 * Module for handle error service request.
 */

export class ServiceError extends Error {
  constructor(error) {
    super(error.response.data.message);
    this.status = error.status;
  }
}
