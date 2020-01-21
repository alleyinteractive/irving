export default {
  /**
   * Retrieve the header used to as an authorization token to authenticate
   * Zephr requests.
   *
   * @param {string} params Request parameters.
   *
   * @return {string} header The request header.
   */
  async getRequestHeader(params) {
    try {
      const {
        body,
        method,
        path,
      } = params;
      const bodyParam = 0 < body.length ? `request_body=${body}&` : '';

      const request = await fetch(
        `${process.env.API_ROOT_URL}/data/zephr_auth?${bodyParam}method=${method}&path=${path}`, // eslint-disable-line max-len
      );
      return await request.json();
    } catch (error) {
      console.info('There was a problem', error); // eslint-disable-line no-console
    }
    return {};
  },

  /**
   * Log in the user
   *
   * @param { email, password } credentials
   */
  async loginUser(credentials) {
    try {
      const {
        email,
        password,
      } = credentials;

      // @todo replace with process.env.ZEPHR_PUBLIC_API_URL
      const url = 'https://technologyreview-staging.admin.blaize.io';

      const request = await fetch(
        `${url}/blaize/login`,
        {
          method: 'POST',
          mode: 'no-cors',
          header: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            identifiers: {
              email_address: email,
            },
            validators: {
              password,
            },
          }),
        }
      );

      console.log(request);

      const response = await request.json();

      console.log(response);
    } catch (error) {
      console.info('There was a problem', error); // eslint-disable-line no-console
    }
  },
};
