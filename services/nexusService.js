/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
import sjcl from 'sjcl';

/**
 * Validate the hash used in the authorization header.
 *
 * @param {string} endpoint      The request url.
 * @param {string} hash          sha256 hash of secret and timestamp.
 * @param {string} authorization The authoriztion header.
 */
async function validateHash(endpoint, hash, authorization) {
  try {
    const response = await fetch(`${endpoint}/api/session/verify/${hash}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'erasmus',
      },
      credentials: 'include',
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.info('There was a problem.', error); // eslint-disable-line no-console
  }
}

export default {
  // @todo write authentication to nexus production server.

  /**
   * Assemble the authorization header used for neuxus requests.
   */
  async getAuth() {
    const endpoint = 'http://localhost:5000';
    const key = process.env.NEXUS_KEY;
    const secret = process.env.NEXUS_SECRET;

    // Unix timestamp needs to be rounded to seconds from milliseconds.
    const timestamp = Math.round(+ new Date() / 1000);
    // Create the sha256 bit array.
    const bitArray = sjcl.hash.sha256.hash(secret + timestamp);
    // Generate the hash.
    const hash = sjcl.codec.hex.fromBits(bitArray);

    const authorization =
      `MITROUTER access_key=${key},timestamp=${timestamp},hash=${hash}`;

    const { status, verified } =
      await validateHash(endpoint, hash, authorization);

    if ('success' === status && true === verified) {
      return {
        isValid: true,
        validTo: timestamp + 540, // ensure the header is only valid for 9 minutes.
        header: authorization,
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
  async getAccount(email, authorization) {
    // @todo this needs to be dynamically generated based on .env settings;
    // stubbing out development endpoint for now.
    const endpoint = 'http://localhost:5000';

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
