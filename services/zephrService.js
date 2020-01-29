import BlaizeSDK from './zephr-sdk/blaize-front-end-sdk.min.js';

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
   * Create a user account on Zephr.
   *
   * @param {{ email, password, attributes }} The registration payload.
   */
  async register({ email, password, attributes }) {
    BlaizeSDK.register(
      {
        identifiers: {
          email_address: email,
        },
        validators: {
          password,
        },
        attributes,
      },
      (error, success) => {
        if (error) {
          console.error(error);
        } else {
          console.log(success);
        }
      }
    );
  },

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
      const user = {
        identifiers: {
          email_address: email,
        },
        validators: {
          password,
        },
      };

      const request = fetch(
        `${process.env.ZEPHR_ROOT_URL}/blaize/login`,
        {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user),
        }
      ).then((res) => ({ status: res.status }));

      // Get the response status code.
      const response = await request;

      if (200 === response.status) {
        // The cookie is already set by this point, so return a success
        // message and parse the cookies in the zephr saga.
        return 'success';
      }

      return 'failed';
    } catch (error) {
      return postErrorMessage(error);
    }
  },

  async getProfile() {
    try {
      BlaizeSDK.getProfile((error, profile) => {
        if (error) {
          postErrorMessage(error);
        } else {
          console.log(profile);
        }
      });
      // const request = fetch(
      //   `${process.env.ZEPHR_ROOT_URL}/blaize/profile`,
      //   { method: 'GET' }
      // );

      // const response = await request;
      // console.log(response);
    } catch (error) {
      postErrorMessage(error);
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

