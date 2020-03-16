export default {
  /**
   * Retrieve a user's order history through their email address.
   *
   * @param {object} parameters Email to lookup and matching request header.
   */
  async getOrders({ email, requestHeader }) { // eslint-disable-line no-unused-vars
    try {
      const request = await fetch(
        `${process.env.NEXUS_ROOT_URL}/api/order/${email}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'test', // @todo Update me for authorization to the production server.
          },
        }
      );
      const response = await request.json();

      console.log(response); // @todo to be fully built out it MIT-377
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
