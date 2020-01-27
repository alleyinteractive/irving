import PublicApiClient from './zephr-sdk/src/PublicApiClient';

// The tenant to be used in client requests.
const tenant = 'technologyreview-staging';

/**
 * Format an error message to be posted to the console.
 *
 * @param {obj} error The error digest.
 *
 * @returns {obj} The formatted error.
 */
const postErrorMessage = (error) => console.error(
  'There was a problem sending the request to Zephr.',
  error
);

export default {
  /**
   * Log a user in and retrieve their entitlements.
   *
   * @param {string} email    The user's email address.
   * @param {string} password The user's password.
   *
   * @returns {obj}           The logged in user and their associated entitlements.
   */
  async login({ email, password }) {
    try {
      const client = PublicApiClient.build(tenant);

      return client.login({
        identifiers: {
          email_address: email,
        },
        validators: {
          password,
        },
      });
    } catch (error) {
      return postErrorMessage(error);
    }
  },

  /**
   * Retrieve a form from Zephr based on it's type (slug).
   *
   * @param {obj} request The key and secret.
   * @param {string} type The form type (e.g. 'login').
   *
   * @returns {obj} The form JSON.
   */
  async getForm(type) {
    try {
      const request = await fetch(
        `${process.env.API_ROOT_URL}/data/zephr_service?&request_type=${type}&method=GET` // eslint-disable-line max-len
      );

      return await request.json();
    } catch (error) {
      return postErrorMessage(error);
    }
  },
};

