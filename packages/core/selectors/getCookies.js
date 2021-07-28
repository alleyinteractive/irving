import { createSelector } from 'reselect';
import pick from 'lodash/fp/pick';
import get from 'lodash/fp/get';
import { getEnv } from '../config/multisite';
import defaultCookies from '../config/defaultCookies';
import getRouteCookies from './getRouteCookies';

/**
 * Pick cookies relevant to the app from the full cookie object.
 *
 * @returns {object}
 */
const getCookies = createSelector(
  [
    get('route.hostname'),
    get('route.cookie'),
    getRouteCookies,
  ],
  (hostname, cookies, routeCookies) => {
    const env = getEnv(hostname);
    const envAllowList = env.COOKIE_ALLOWLIST
      ? env.COOKIE_ALLOWLIST.split(',')
      : [];
    const allowlistCookies = [
      ...defaultCookies,
      ...envAllowList,
    ];

    return {
      ...routeCookies,
      ...pick(allowlistCookies)(cookies),
    }
  },
);

export default getCookies;