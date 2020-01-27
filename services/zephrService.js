/* eslint-disable */
import axios from 'axios';
import AdminApiClient from './zephr-sdk/src/AdminApiClient';
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
          password: password,
        },
      })
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
      const accessKey = 'a0d08da8-c752-4127-a28c-6127a073d0d7'; // @todo remove me.
      const secretKey = '5aff5e2b-990e-4fcb-95f3-77a703bc943'; // @todo remove me.

      const client = AdminApiClient.build(accessKey, secretKey, tenant);
      const response = await client.get(`/v3/forms/${type}`);
      
      console.log(response);
    } catch (error) {
      return postErrorMessage(error);
    }
  },
};

