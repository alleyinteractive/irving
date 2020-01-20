export default {
  /**
   * Retrieve the header used to as an authorization token to authenticate
   * Zephr requests.
   *
   * @param {string} body    A stringified version of the request's body.
   * @param {string} method  The request's method (e.g. "GET", "POST", etc).
   * @param {string} path    The request's path (less the host e.g. /v3/users).
   */
  async getRequestHeader(body, method, path) {
    try {
      const request = await fetch(
        `${process.env.API_ROOT_URL}/data/zephr_auth?request_body=${body}&method=${method}&path=${path}`,
      );
      const header = await request.json();

      return header;
    } catch (error) {
      console.info('There was a problem', error); // eslint-disable-line no-console
    }
    return {};
  },
};
