/* eslint-disable */
import axios from 'axios';
import crypto from 'crypto';

/**
 * Create a valid Authorizaiton header for requests to the Zephr admin API.
 *
 * @param {string} method The request method (e.g. GET, POST, etc).
 * @param {string} path   The request path less the host (e.g. `/v3/forms/login`).
 * @param {string} body   The request body.
 *
 * @returns {string} The signed authorization header.
 */
function buildRequestHeader(method, path, body = '') {
  const timestamp = new Date().getTime();
  const nonce = Math.round(
    Math.random() * 1000000000000
  ).toString(16);
  // Set key and secret.
  const key = 'a0d08da8-c752-4127-a28c-6127a073d0d7'; // @todo remove me.
  const secret = '5aff5e2b-990e-4fcb-95f3-77a703bc943'; // @todo remove me.

  const signature = crypto.createHmac('sha256', key).update(
    secret + body + path + method + timestamp + nonce
  ).digest('base64');

  return `BLAIZE-HMAC-SHA256 ${key}:${timestamp}:${nonce}:${signature}`;
}

// For testing requests to the Zephr admin API.
// @todo remove me.
function createRequestString() {
  const url = 'https://technologyreview-staging.admin.blaize.io/v3/forms/login';
  const authorizationHeader = buildRequestHeader(
    'GET',
    `/v3/forms/login`
  ); 
  return `curl --location --request GET '${url}' --header 'Accept: application/json' --header 'Content-Type: application/json' --header 'Authorization:${authorizationHeader}'`;
}

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
      const tenant = 'technologyreview-staging';
      const request = await axios.post(
        `https://${tenant}.admin.blaize.io/blaize/login`,
        {
          identifiers: {
            email_address: email,
          },
          validators: {
            password,
          },
        }
      );

      const response = await request.json();

      return response;
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
      // Build the authorization header to be used in the request.
      const authorizationHeader = buildRequestHeader(
        'GET',
        `/v3/forms/${type}`
      );
      const tenant = 'technologyreview-staging';
      const request = axios(
        `https://${tenant}.admin.blaize.io/v3/forms/${type}`,
        {
          method: 'GET',
          mode: 'no-cors',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: authorizationHeader,
          },
          withCredentials: true,
          credentials: 'include',
        }
      );
     
      return await request.json();
    } catch (error) {
      return postErrorMessage(error);
    }
  },
};

