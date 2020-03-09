import {
  parseSessionString,
} from './utils';
import zephrService from './zephrService';

let provider = '';

/**
 * Start the Zephr oAuth flow.
 */
export async function openConnection(route, service) {
  try {
    provider = service;

    return await fetch(
      `${process.env.ZEPHR_ROOT_URL}/blaize/oauth/state`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          start_url: `https://localhost/${route}`,
          target_url: `https://localhost/${'do-something'}`,
        }),
      }
    );
  } catch (error) {
    return console.error(error);
  }
}

export default {
  /**
   * Initialize the SSO service and perform actions based on the type of connection.
   * Log the user in and capture the session cookie if an account exists. Redirect
   * through the Zephr registration workflow if no account exists.
   *
   * @param {object} response The data retrieved from the SSO authorization window.
   *
   * @returns {object} status The status of the SSO request.
   */
  async initialize(response) {
    const {
      data: {
        action,
        cookie,
        identifier,
        stateKey,
      },
    } = response;

    if ('register' === action) {
      const status = await this.register(identifier, stateKey);

      return status;
    }

    if ('login' === action) {
      // Set the cookie.
      document.cookie = cookie;

      const {
        isSSO,
        hasFacebookAuth,
        hasGoogleAuth,
      } = zephrService.getProfile(cookie);

      if (
        ! isSSO ||
        (('google' === provider && ! hasGoogleAuth) ||
        ('facebook' === provider && ! hasFacebookAuth))
      ) {
        this.addProvider(cookie);
      }

      return {
        status: 'success',
        cookie: parseSessionString(cookie),
      };
    }

    return { status: 'failed' };
  },

  /**
   * Add a SSO provider connection.
   *
   * @param {string} cookie The session cookie returned from Zephr.
   */
  async addProvider(cookie) {
    try {
      const body = {
        'sso-user': true,
        [`${provider}-authenticated`]: true,
      };

      const request = fetch(
        `${process.env.ZEPHR_ROOT_URL}/blaize/profile`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            cookie,
          },
          credentials: 'include',
          body: JSON.stringify(body),
        }
      );

      const response = await request;
      console.log(response);

      if (200 === response.status) {
        return 'success';
      }

      return 'failed';
    } catch (error) {
      return console.error(error);
    }
  },

  /**
   * Create a user account associated with a given SSO provider in Zephr.
   *
   * @param {string} email    The user's email address.
   * @param {string} token    The login token retrieved from Zephr after SSO auth.
   *
   * @returns {object} status Status of the registration response.
   */
  async register(email, token) {
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
          [`${provider}-authenticated`]: true,
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
