export default {
  /**
   * Retrieve a user's order history through their email address.
   * The endpoint this service requests is an express endpoint from this server.
   *
   * @see server/nexusData.js
   *
   * @return {object} The Nexus user object if found, or an empty array.
   */
  async getUser() {
    try {
      const request = await fetch(
        `${process.env.ROOT_URL}/irving/v1/nexus_data`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      return await request.json();
    } catch (error) {
      console.info('There was a problem.', error); // eslint-disable-line no-console
    }
    return {};
  },
};
