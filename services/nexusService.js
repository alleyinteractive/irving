export default {
  /**
   * Retrieve a user's order history through their email address.
   *
   * @param {object} parameters Email to lookup and matching request header.
   */
  async getUser({ email, requestHeader }) { // eslint-disable-line no-unused-vars
    try {
      const request = await fetch(
        `${process.env.NEXUS_ROOT_URL}/api/user/email/${email}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: requestHeader,
          },
        }
      );
      const response = await request.json();
      return response;
    } catch (error) {
      console.info('There was a problem.', error); // eslint-disable-line no-console
    }
    return {};
  },

  /**
   * Retrieve the header used to as an authorization token to authenticate
   * nexus requests.
   */
  async getRequestHeader() {
    try {
      const request = await fetch(
        `${process.env.API_ROOT_URL}/data/nexus_auth`
      );
      const { header, timestamp } = await request.json();

      return {
        header,
        expires: parseInt(timestamp, 10) + 300,
      };
    } catch (error) {
      console.info('There was a problem', error); // eslint-disable-line no-console
    }
    return {};
  },
};
