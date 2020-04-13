import { createSelector } from 'reselect';
import pick from 'lodash/fp/pick';
import get from 'lodash/fp/get';
import Cookies from 'universal-cookie';

/**
 * Get any query parameters that should be mapped from the
 * cookies in the request.
 * ---
 * This can be used to pass cookie values as parameters in the components
 * request URL. In many cases, we won't be able to use cookies in the
 * Components API, so this can be used to pass the values we need as a parameter
 * instead.
 * ---
 * The specific cookies to be mapped to query params can be set as a comma-separated
 * list in the `COOKIE_MAP_LIST` environment variable.
 *
 * @returns {object}
 */
const getCookies = createSelector(
  [
    get('route.cookie'),
  ],
  (routeCookies) => {
    const cookies = new Cookies(routeCookies);
    const env = Object.keys(process.env).length ? process.env : window.__ENV__; // eslint-disable-line no-underscore-dangle
    const cookieAllowlist = env.COOKIE_MAP_LIST ?
      env.COOKIE_MAP_LIST.split(',') :
      [];
    const allowlistCookies = pick(cookieAllowlist)(routeCookies);

    return {
      ...allowlistCookies,
      bypassCache: cookies.get('bypassCache'),
      authorizationHeader: cookies.get('authorizationHeader'),
    };
  }
);

export default getCookies;
