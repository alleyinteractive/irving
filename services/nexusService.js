/* eslint-disable no-unused-vars */
// @todo use header for authentication.
import bcrypt from 'bcryptjs';

/**
 * Validate the hash used in the authorization header.
 *
 * @param {string} hash   sha256 hash of secret and timestamp.
 * @param {string} header The authorization header.
 */
async function validateHash(hash, header) {
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
   * @param {object} { username, password }
   */
  async newSession({ username, password }) {
    try {
      const response = await fetch(
        `${process.env.NEXUS_ROOT_URL}/api/session/new`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'test', // @todo update me
          },
          credentials: 'include',
          body: JSON.stringify({
            username,
            password, // @todo encrypt this before sending to the nexus.
          }),
        }
      );
      const { hash, access } = await response.json();
      const { status, verified } = await validateHash(hash);

      if ('success' === status && true === verified) {
        return {
          access,
          isValid: true,
          hash,
        };
      }
    } catch (error) {
      console.info('There was a problem', error); // eslint-disable-line no-console
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
        `${process.env.API_ROOT_URL}/data/request_auth`
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

  /**
   * Lookup an account by email address.
   *
   * @param {string} email         User email to look up.
   * @param {string} authorization Authorization header to be passed in request.
   */
  async getAccount({ email, header }) {
    // eslint-disable-line no-unused-vars
    try {
      const response = await fetch(
        `${process.env.NEXUS_ROOT_URL}/api/user/email/${email}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'test',
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

  /**
   * When we receive a new user email, create the user in the database.
   *
   * @param { email, fullName, password, header } params
   */
  async createAccount({
    email,
    fullName,
    password,
    header,
  }) {
    // eslint-disable-line no-unused-vars
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const namesArr = fullName.split(' ');
    const firstName = namesArr[0];
    const lastName = namesArr[namesArr.length - 1];

    try {
      const response = await fetch(
        `${process.env.NEXUS_ROOT_URL}/api/user/email`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'test',
          },
          credentials: 'include',
          body: JSON.stringify({
            email,
            password: hash,
            first_name: firstName,
            last_name: lastName,
          }),
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.info('There was a problem.', error); // eslint-disable-line no-console
    }
    return {};
  },

  /**
   * Once an account has been validated, login the user.
   *
   * @param { id, password, header } params
   */
  async login({ id, password, header }) {
    // eslint-disable-line no-unused-vars
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    try {
      const response = await fetch(
        `${process.env.NEXUS_ROOT_URL}/api/user/auth`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'test',
          },
          credentials: 'include',
          body: JSON.stringify({
            id,
            password: hash,
          }),
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.info('There was a problem.', error); // eslint-disable-line no-console
    }
    return {};
  },

  /**
   * Update an email address already stored in the database.
   *
   * @param { email, newEmail header } params
   */
  async changeEmail({ email, newEmail, header }) {
    // eslint-disable-line no-unused-vars
    try {
      const response = await fetch(
        `${process.env.NEXUS_ROOT_URL}/api/user/email`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'test',
          },
          credentials: 'include',
          body: JSON.stringify({
            email,
            newEmail,
          }),
        }
      );
    } catch (error) {
      console.info('There was a problem.', error); // eslint-disable-line no-console
    }
    return {};
  },

  /**
   * Validate a user's email address through a hash.
   *
   * @param { email, hash, header } params
   */
  async verifyUserAccount({ email, hash, header }) {
    // eslint-disable-line no-unused-vars
    try {
      const response = await fetch(
        `${process.env.NEXUS_ROOT_URL}/api/user/verify`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'test',
          },
          credentials: 'include',
          body: JSON.stringify({
            hash,
            email,
          }),
        }
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.info('There was a problem.', error); // eslint-disable-line no-console
    }
  },
};
