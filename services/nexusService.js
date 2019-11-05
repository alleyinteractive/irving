export default {
  // @todo write authentication to nexus production server.

  /**
   * Lookup an account by email address.
   *
   * @param {string} email User email to look up.
   * @returns {{}}
   */
  async getAccount(email) {
    // @todo this needs to be dynamically generated based on .env settings;
    // stubbing out development endpoint for now.
    const endpoint = 'http://localhost:5000';
    const authorization = 'test';

    try {
      const response = await fetch(`${endpoint}/api/user/email/${email}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: authorization,
        },
        credentials: 'include',
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.info('There was a problem.', error); // eslint-disable-line no-console
    }
    return {};
  },
};
