import Cookies from 'universal-cookie';
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
          start_url: `${process.env.ROOT_URL}/login`,
          target_url: `${process.env.ROOT_URL}/login`,
        }),
      }
    );
  } catch (error) {
    // @todo Add dynamic error handling that can be displayed to the user on the front end if the
    // connection should fail. This will be handled in MIT-794.
    return console.error(error); // eslint-disable-line no-console
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

      const cookies = new Cookies(cookie);

      return {
        status: 'success',
        cookie: cookies.get('blaize_session'),
      };
    }

    return { status: 'failed' };
  },

  /**
   * Add a SSO provider connection.
   *
   * @param {string} cookie The session cookie returned from Zephr.
   *
   * @returns {string} status The status (success/fail) of the request.
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

      if (200 === response.status) {
        return 'success';
      }

      return 'failed';
    } catch (error) {
      // @todo see line 27.
      return console.error(error); // eslint-disable-line no-console
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
        identifiers: {},
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
      // @todo see line 27.
      return console.error(error); // eslint-disable-line no-console
    }
  },

  /**
   * Open the Google SSO client window.
   */
  openGoogleClient() {
    window.open(
      `${process.env.ZEPHR_ROOT_URL}/blaize/oauth/google`,
      'Sign in with Google',
      'menubar=no,location=yes,resizable=no,scrollbars=no,status=no,width=500,height=600' // eslint-disable-line max-len
    );
  },

  /**
   * Open the Facebook SSO client window.
   */
  openFacebookClient() {
    window.open(
      `${process.env.ZEPHR_ROOT_URL}/blaize/oauth/facebook`,
      'Sign in with Facebook',
      'menubar=no,location=yes,resizeable=no,scrollbars=no,status=no,width=500,height=600' // eslint-disable-line max-len
    );
  },

  /**
   * Open the Infinite Connection SSO client window.
   */
  openInfiniteConnectionClient() {
    window.open(
      `${process.env.ZEPHR_ROOT_URL}/blaize/oauth/mitaa`,
      'Sign in with your Infinite Connection account',
      'menubar=no,location=yes,resizeable=no,scrollbars=no,status=no,width=500,height=600' // eslint-disable-line max-len
    );
  },
};
