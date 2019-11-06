/**
 * Validate the hash used in the authorization header.
 *
 * @param {string} hash   sha256 hash of secret and timestamp.
 * @param {string} header The authoriztion header.
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

export default {
  // @todo write authentication to nexus production server.

  /**
   * Generate a new user session and hash in the database.
   *
   * @param {string} username
   * @param {string} password
   */
  async newSession(username, password) {
    try {
      await fetch(
        `${process.env.NEXUS_ROOT_URL}/api/session/new`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'test',
          },
          credentials: 'include',
          body: JSON.stringify({
            username,
            password, // @todo encrypt this before sending to the nexus.
          }),
        }
      );
    } catch (error) {
      console.info('There was a problem', error); // eslint-disable-line no-console
    }
  },

  /**
   * Assemble the authorization header used for neuxus requests.
   */
  async getAuth() {
    const response = await fetch(
      `${process.env.API_ROOT_URL}/data/request_auth`
    );
    const {
      hash,
      header,
      timestamp,
    } = await response.json();

    const { status, verified } =
      await validateHash(hash, header);

    if ('success' === status && true === verified) {
      return {
        isValid: true,
        validTo: parseInt(timestamp, 10) + 540, // The header is only valid for 9 minutes.
        header,
      };
    }

    return {
      isValid: false,
    };
  },

  /**
   * Lookup an account by email address.
   *
   * @param {string} email         User email to look up.
   * @param {string} authorization Authorization header to be passed in request.
   * @returns {{}}
   */
  async getAccount({ email, header }) {
    try {
      const response = await fetch(
        `${process.env.NEXUS_ROOT_URL}/api/user/email/${email}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: header,
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
  },
};
