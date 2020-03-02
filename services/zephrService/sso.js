import {
  parseSessionString,
} from './utils';

export default {
  initialize(response) {
    try {
      const {
        data: {
          action,
          cookie,
          identifier,
          stateKey,
        },
      } = response;

      if ('register' === action) {
        this.register(identifier, stateKey);
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
    } catch (error) {
      return console.error(error);
    }
  },

  async register(email, token) {
    try {
      const data = {
        identifiers: {
          email_address: email,
        },
        validators: {
          token_exchange: token,
        },
      };

      const request = fetch(
        `${process.env.ZEPHR_ROOT_URL}/blaize/register`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(data),
        }
      )
        .then((res) => {
          if (200 === res.status) {
            return res.json();
          }

          return {
            status: 'failed',
          };
        });

      const response = await request;
      console.log(response);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  openGoogleClient() {
    window.open(
      '/blaize/oauth/google',
      'Sign in with Google',
      'menubar=no,location=yes,resizable=no,scrollbars=no,status=no,width=500,height=600' // eslint-disable-line max-len
    );
  },

  openFacebookClient() {
    window.open(
      '/blaize/oauth/facebook',
      'Sign in with Facebook',
      'menubar=no,location=yes,resizeable=no,scrollbars=no,status=no,width=500,height=600' // eslint-disable-line max-len
    );
  },
};
