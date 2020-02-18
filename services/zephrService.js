// @todo keep this for mocking calls with the BrowserSDK.
// It should be remove once the service is fully built out.
// import BlaizeSDK from './zephr-sdk/blaize-front-end-sdk.min.js';

/**
 * Format an error message to be posted to the console.
 *
 * @param {obj} error The error digest.
 *
 * @returns {obj} The formatted error.
 */
const postErrorMessage = (error) => console.error( // eslint-disable-line no-console
  'There was a problem sending the request to Zephr.',
  error
);

export default {
  /**
   * Register a user and retrieve their entitlements.
   *
   * @param {{ email, password, attributes }} The user's credentials.
   *
   * @return {obj}                            The registered user and their associated entitlements.
   */
  async register({ email, password, attributes }) {
    try {
      const {
        fullName,
        firstName,
        lastName,
      } = attributes;

      const user = {
        identifiers: {
          email_address: email,
        },
        validators: {
          password,
        },
        attributes: {
          'full-name': fullName,
          'first-name': firstName,
          'last-name': lastName,
        },
      };

      const request = fetch(
        `${process.env.ZEPHR_ROOT_URL}/blaize/register`,
        {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user),
        }
      ).then((res) => res.json());

      const response = await request;

      if ('tracking_id' in response) {
        return {
          status: 'success',
          trackingId: response.tracking_id,
        };
      }

      return { status: 'failed' };
    } catch (error) {
      return postErrorMessage(error);
    }
  },

  /**
   * Initiate the token exchange by sending the registered user a verification
   * email.
   *
   * @param {string} email The user's email address.
   */
  async sendVerificationEmail(email) {
    try {
      const body = {
        identifiers: {
          email_address: email,
        },
        delivery: {
          method: 'email',
          destination: email,
          action: 'register',
          redirect: '/',
        },
      };

      const request = fetch(
        `${process.env.ZEPHR_ROOT_URL}/blaize/token-exchange`,
        {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        }
      );

      return;
    } catch (error) {
      return postErrorMessage(error);
    }
  },

  /**
   * Use the token provided in the verification email to complete the token exchange.
   *
   * @param {string} token The token.
   *
   * @returns {string} sessionCookie The verified user's session cookie.
   */
  async verifyEmail(token) {
    try {
      const request = fetch(
        `${process.env.ZEPHR_ROOT_URL}/blaize/token-exchange?token=${token}`,
        {
          method: 'GET',
          credentials: 'include',
        }
      ).then((res) => res);

      const response = await request;

      if (200 === response.status) {
        // On success parse the cookies set by Zephr's API response.
        const cookieArr = document.cookie
          .split(';')
          .reduce((res, item) => {
            const [key, val] = item.trim().split('=').map(decodeURIComponent);
            const allNumbers = (str) => /^\d+$/.test(str);
            try {
              return Object.assign(
                res,
                {
                  [key]: allNumbers(val) ? val : JSON.parse(val),
                }
              );
            } catch (e) {
              return Object.assign(res, { [key]: val });
            }
          }, {});

        const {
          blaize_session: sessionCookie,
        } = cookieArr;

        return `blaize_session=${sessionCookie}`;
      }

      return false;
    } catch (error) {
      return postErrorMessage(error);
    }
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
      ).then((res) => {
        if (404 === res.status) {
          return {
            status: 'failed',
            type: 'user-not-found',
          };
        }

        if (401 === res.status) {
          return {
            status: 'failed',
            type: 'invalid-password',
          };
        }

        return res.json();
      });

      const response = await request;

      if ('status' in response && 'failed' === response.status) {
        return response;
      }

      return {
        status: 'success',
        cookie: response.cookie,
        trackingId: response.tracking_id,
      };
    } catch (error) {
      return postErrorMessage(error);
    }
  },

  /**
   * Log a user out and remove their Zephr session cookie.
   */
  async logOut() {
    try {
      const request = fetch(
        `${process.env.ZEPHR_ROOT_URL}/blaize/logout`,
        { method: 'POST' }
      ).then((res) => res.json());

      const response = await request;

      if ('message' in response && 'Session deleted' === response.message) {
        return 'success';
      }

      return 'failed';
    } catch (error) {
      return postErrorMessage(error);
    }
  },

  /**
   * Get the user's profile (first and last name).
   *
   * @param {string} sessionCookie The Zephr session cookie to be passed in the request's headers.
   *
   * @returns {object} profile The user's profile.
   */
  async getProfile(sessionCookie) {
    try {
      const request = fetch(
        `${process.env.ZEPHR_ROOT_URL}/blaize/profile`,
        {
          method: 'GET',
          headers: {
            cookie: sessionCookie,
          },
          credentials: 'include',
        }
      ).then((res) => res.json());

      const response = await request;

      const {
        'first-name': firstName,
        'last-name': lastName,
      } = response;

      return { firstName, lastName };
    } catch (error) {
      postErrorMessage(error);
      // Return null to exit the profile setting portion of the saga.
      return null;
    }
  },

  /**
   * Get the user's account information.
   *
   * @param {string} sessionCookie The Zephr session cookie to be passed in the request's headers.
   *
   * @returns {object} account The user's account.
   */
  async getAccount(sessionCookie) {
    try {
      const request = fetch(
        `${process.env.ZEPHR_ROOT_URL}/blaize/account`,
        {
          method: 'GET',
          headers: {
            cookie: sessionCookie,
          },
          credentials: 'include',
        }
      ).then((res) => res.json());

      const response = await request;

      const {
        identifiers: {
          email_address: emailAddress,
        },
      } = response;

      return { emailAddress };
    } catch (error) {
      postErrorMessage(error);
      // Return null to exit the account setting portion of the saga.
      return null;
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
        `${process.env.API_ROOT_URL}/data/zephr_service?&request_type=${type}` // eslint-disable-line max-len
      );

      return await request.json();
    } catch (error) {
      return postErrorMessage(error);
    }
  },
};

