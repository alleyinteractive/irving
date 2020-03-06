import {
  parseSessionString,
} from './utils';

export default {
  /**
   * Initialize the SSO service and perform actions based on the type of connection.
   * Log the user in and capture the session cookie if an account exists. Redirect
   * through the Zephr registration workflow if no account exists.
   *
   * @param {string} provider The selected login provider (e.g. google, facebook).
   * @param {object} response The data retrieved from the SSO authorization window.
   *
   * @returns {object} status The status of the SSO request.
   */
  async initialize(provider, response) {
    const {
      data: {
        action,
        cookie,
        identifier,
        stateKey,
      },
    } = response;

    if ('register' === action) {
      const status = await this.register(provider, identifier, stateKey);

      return status;
    }

    if ('login' === action) {
      // Set the cookie.
      document.cookie = cookie;

      return {
        status: 'success',
        cookie: parseSessionString(cookie),
      };
    }

    return { status: 'failed' };
  },

  /**
   * Create a user account associated with a given SSO provider in Zephr.
   *
   * @param {string} provider The SSO login provider.
   * @param {string} email    The user's email address.
   * @param {string} token    The login token retrieved from Zephr after SSO auth.
   *
   * @returns {object} status Status of the registration response.
   */
  async register(provider, email, token) {
    try {
      const data = {
        identifiers: {
          email_address: email,
        },
        validators: {
          token_exchange: token,
        },
        attributes: {
          'full-name': '',
          'first-name': '',
          'last-name': '',
          'email-address': email,
          'sso-user': true,
          'sso-provider': provider,
        },
      };

      return await fetch(
        `${process.env.ZEPHR_ROOT_URL}/blaize/register`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(data),
        }
      ).then((res) => {
        if (200 === res.status) {
          return {
            status: 'success',
          };
        }

        return {
          status: 'failed',
        };
      });
    } catch (error) {
      return console.error(error);
    }
  },

  /**
   * Open the Google SSO client window.
   */
  openGoogleClient() {
    window.open(
      '/blaize/oauth/google',
      'Sign in with Google',
      'menubar=no,location=yes,resizable=no,scrollbars=no,status=no,width=500,height=600' // eslint-disable-line max-len
    );
  },

  /**
   * Open the Facebook SSO client window.
   */
  openFacebookClient() {
    window.open(
      '/blaize/oauth/facebook',
      'Sign in with Facebook',
      'menubar=no,location=yes,resizeable=no,scrollbars=no,status=no,width=500,height=600' // eslint-disable-line max-len
    );
  },
};
