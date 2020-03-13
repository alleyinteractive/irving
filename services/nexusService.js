/**
 * Validate the hash used in the authorization header.
 *
 * @param {string} hash   sha256 hash of secret and timestamp.
 * @param {string} header The authorization header.
 */
async function validateHash(hash, header) { // eslint-disable-line no-unused-vars
  try {
    const response = await fetch(
      `${process.env.NEXUS_ROOT_URL}/api/session/verify/${hash}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'test', // @todo fix me.
        },
        credentials: 'include',
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.info('There was a problem.', error); // eslint-disable-line no-console
  }
  return {};
}

// @todo write authentication to nexus production server.
export default {
  async getOrders() {
    try {
      const request = await fetch(
        `${process.env.NEXUS_ROOT_URL}/api/order`,
        {
          method: 'GET',
        }
      );
      const response = await request.json();
    
      console.log(response);
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