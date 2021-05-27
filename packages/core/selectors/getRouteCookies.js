import { createSelector } from 'reselect';
import pick from 'lodash/fp/pick';
import get from 'lodash/fp/get';
import { getEnv } from 'config/multisite';

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
    get('route.hostname'),
    get('route.cookie'),
  ],
  (hostname, cookies) => {
    const env = getEnv(hostname);
    const envAllowList = env.ROUTE_COOKIES
      ? env.ROUTE_COOKIES.split(',')
      : [];

    return pick(envAllowList)(cookies);
  },
);

export default getCookies;
