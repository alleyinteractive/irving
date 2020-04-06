import kebabCase from 'lodash/kebabCase';

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
      ).then((res) => {
        if (400 === res.status) {
          return {
            status: 'failed',
            type: 'password-not-strong',
          };
        }

        if (409 === res.status) {
          return {
            status: 'failed',
            type: 'user-already-exists',
          };
        }

        return res.json();
      });

      const response = await request;

      if ('tracking_id' in response) {
        return {
          status: 'success',
          trackingId: response.tracking_id,
        };
      }

      return response;
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

      fetch(
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

      return true;
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
   * Begin the password reset process when a user provides their email address
   * and initiate the Zephr flow to send them a link to reset their password.
   *
   * @param {object} credentials The user's email address.
   *
   * @returns {object} status The response status.
   */
  async requestReset({ email }) {
    try {
      const body = {
        identifiers: {
          email_address: email,
        },
      };

      const request = fetch(
        `${process.env.ZEPHR_ROOT_URL}/blaize/users/reset`,
        {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        }
      );

      const response = await request;

      if (201 === response.status) {
        return { status: 'success' };
      }

      if (404 === response.status) {
        return {
          status: 'failed',
          type: 'user-not-found',
        };
      }

      return {
        status: 'failed',
        type: 'bad-request',
      };
    } catch (error) {
      return postErrorMessage(error);
    }
  },

  /**
   * Complete the password reset process by submitting the new password to
   * Zephr and redirecting the user.
   *
   * @param {object} credentials The user's password and the state key from the reset email.
   *
   * @returns {object} status The response status.
   */
  async resetPassword({ password, state }, cookie) {
    try {
      const body = {
        validators: {
          password,
        },
      };

      const request = fetch(
        `${process.env.ZEPHR_ROOT_URL}/blaize/users/reset/${state}`,
        {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            cookie,
          },
          body: JSON.stringify(body),
        }
      );

      const response = await request;

      if (200 === response.status) {
        return { status: 'success' };
      }

      if (400 === response.status) {
        return {
          status: 'failed',
          type: 'password-not-strong',
        };
      }

      if (404 === response.status) {
        return {
          status: 'failed',
          type: 'invalid-state',
        };
      }

      return {
        status: 'failed',
        type: 'bad-request',
      };
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
      ).then(async (res) => {
        if (404 === res.status) {
          return {
            status: 'failed',
            type: 'user-not-found',
          };
        }

        if (401 === res.status) {
          const responseText = await res.text();
          const responseTitle = kebabCase(
            new window.DOMParser().parseFromString(
              responseText, 'text/html'
            ).title
          );

          if ('email-verification-is-required' === responseTitle) {
            return {
              status: 'failed',
              type: 'email-not-verified',
            };
          }

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
   * Request to update a current users email address.
   *
   * @param {string} email    The user's email address.
   *
   * @returns {obj}           The logged in user and their associated entitlements.
   */
  async requestUpdateEmail({ email, cookie }) {
    try {
      const user = {
        new_identifiers: {
          email_address: email,
        },
      };

      const request = fetch(
        `${process.env.ZEPHR_ROOT_URL}/blaize/users/update-email/`,
        {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            cookie,
          },
          body: JSON.stringify(user),
        }
      );

      const response = await request;

      if (201 === response.status) {
        return { status: 'success' };
      }

      if (404 === response.status) {
        return {
          status: 'failed',
          type: 'user-not-found',
        };
      }

      return {
        status: 'failed',
        type: 'bad-request',
      };
    } catch (error) {
      return postErrorMessage(error);
    }
  },

  /**
   * Request that the confirmation email be sent to the users new email address.
   *
   * @param {object} token The user's token to complete the email update.
   *
   * @returns {object} status The response status.
   */
  async requestUpdateEmailConfirmation(token, cookie) {
    try {
      const request = fetch(
        // eslint-disable-next-line max-len
        `${process.env.ZEPHR_ROOT_URL}/blaize/users/update-email-passwordless/${token}`,
        {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            cookie,
          },
        }
      );

      const response = await request;

      if (200 === response.status) {
        return { status: 'success' };
      }

      if (404 === response.status) {
        return {
          status: 'failed',
          type: 'invalid-state',
        };
      }

      return {
        status: 'failed',
        type: 'bad-request',
      };
    } catch (error) {
      return postErrorMessage(error);
    }
  },

  /**
   * Complete the update email process by submitting the password to
   * Zephr and redirecting the user.
   *
   * @param {object} token The user's token to complete the email update.
   *
   * @returns {object} status The response status.
   */
  async updateEmail(token, cookie) {
    // @TODO: Once Zephr has added a new email template to their email settings,
    // we'll need to separate these requests out. On the user's new email confirmation,
    // we would create a new function for the 2nd call.
    try {
      const request = fetch(
        `${process.env.ZEPHR_ROOT_URL}/blaize/users/update-email/${token}`,
        {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            cookie,
          },
        }
      );

      const response = await request;

      if (200 === response.status) {
        return { status: 'success' };
      }

      if (404 === response.status) {
        return {
          status: 'failed',
          type: 'invalid-state',
        };
      }

      return {
        status: 'failed',
        type: 'bad-request',
      };
    } catch (error) {
      return postErrorMessage(error);
    }
  },

  /**
   * Log a user out and remove their Zephr session cookie.
   */
  async logOut(session) {
    // Get the session cookie to add the header.
    const { sessionCookie: cookie = '' } = session || {};

    try {
      const request = fetch(
        `${process.env.ZEPHR_ROOT_URL}/blaize/logout`,
        {
          method: 'POST',
          headers: {
            cookie,
          },
          credentials: 'include',
        }
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
   * Get the user's profile.
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
        'sso-user': isSSO,
        'sso-provider': ssoProvider,
        'google-authenticated': hasGoogleAuth,
        'facebook-authenticated': hasFacebookAuth,
        'mitaa-authenticated': isAlum,
      } = response;

      if (true === isSSO) {
        return {
          firstName,
          lastName,
          isSSO,
          ssoProvider,
          hasGoogleAuth,
          hasFacebookAuth,
          isAlum,
        };
      }

      return {
        firstName,
        lastName,
      };
    } catch (error) {
      postErrorMessage(error);
      // Return null to exit the profile setting portion of the saga.
      return null;
    }
  },

  /**
   * Get a user's extended profile information based on their SSO provider.
   *
   * @param {{ cookie, provider }} The session cookie & SSO provider ID.
   *
   * @returns {object} extendedProfile
   */
  async getExtendedProfile({ cookie, provider }) {
    try {
      const request = fetch(
        `${process.env.ZEPHR_ROOT_URL}/blaize/profile/${provider}`,
        {
          method: 'GET',
          headers: {
            cookie,
          },
          credentials: 'include',
        }
      ).then((res) => res.json());

      const response = await request;

      if ('_mitta' === provider) {
        const {
          firstName,
          lastName,
        } = response;

        return {
          firstName,
          lastName,
        };
      }

      if ('_facebook' === provider) {
        const { name } = response;
        const namesArr = name.split(' ');
        const firstName = namesArr[0];
        const lastName = namesArr[namesArr.length - 1];

        return {
          firstName,
          lastName,
        };
      }

      if ('_google' === provider) {
        const {
          given_name: firstName,
          family_name: lastName,
        } = response;

        return {
          firstName,
          lastName,
        };
      }

      return null;
    } catch (error) {
      postErrorMessage(error);
      // Return null to exit the profile setting portion of the saga.
      return null;
    }
  },

  /**
   * Update the user's profile (first, last, and full name).
   *
   * @param {{object,string}} Profile properties to update and the current cookie.
   *
   * @returns {string} Request status.
   */
  async updateProfile({ properties, cookie }) {
    try {
      const {
        firstName,
        fullName,
        lastName,
      } = properties;

      const body = {
        'full-name': fullName,
        'first-name': firstName,
        'last-name': lastName,
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
      ).then((res) => {
        if (200 === res.status) {
          return {
            status: 200,
            ...res.json(),
          };
        }

        return {
          status: 'failed',
        };
      });

      const response = await request;

      if (200 === response.status) {
        return 'success';
      }

      return 'failed';
    } catch (error) {
      return postErrorMessage(error);
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
