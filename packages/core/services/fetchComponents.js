import queryString from 'query-string';
import { Cookies } from 'react-cookie';
import { pick } from 'lodash/fp';
import AbortController from 'abort-controller';
import { CONTEXT_PAGE } from 'config/constants';
import isNode from 'utils/isNode';
import getService from './cacheService';
import getLogService from './logService';

const log = getLogService('irving:components');

/**
 * Get any query parameters that should be included with every components request.
 *
 * @returns {object}
 */
function getExtraQueryParams() {
  // To access environment variables at run time in a client context we must
  // access them through a global provided by the server render.
  const env = Object.keys(process.env).length ? process.env : window.__ENV__; // eslint-disable-line no-underscore-dangle
  return Object
    .keys(env)
    .filter((key) => 0 === key.indexOf('API_QUERY_PARAM_'))
    .reduce((acc, key) => {
      const param = key.replace('API_QUERY_PARAM_', '').toLowerCase();
      return {
        ...acc,
        [param]: env[key],
      };
    }, {});
}

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
function getQueryParamsFromCookies(cookieData) {
  // To access environment variables at run time in a client context we must
  // access them through a global provided by the server render.
  const env = Object.keys(process.env).length ? process.env : window.__ENV__; // eslint-disable-line no-underscore-dangle
  const cookieAllowList = env.COOKIE_MAP_LIST ?
    env.COOKIE_MAP_LIST.split(',') :
    [];

  const cookies = new Cookies(cookieData);
  const cookieObject = cookies.getAll({ doNotParse: true });

  const cookieQueryParams = pick(cookieAllowList)(cookieObject);

  return cookieQueryParams;
}

/**
 * Fetch components for the page from the API.
 * @param {string} path      - path of the request page
 * @param {string} search    - search string
 * @param {string} cookie    - cookie header string
 * @param {string} [context] - "page" (page specific components) or
 *                           "site" (all components)
 * @returns {Promise<{object}>}
 */
export async function fetchComponents(
  path,
  search,
  cookie = '',
  context = CONTEXT_PAGE
) {
  const query = queryString.stringify({
    path,
    context,
    ...getExtraQueryParams(),
    ...queryString.parse(search),
    ...getQueryParamsFromCookies(cookie),
  });
  const apiUrl = `${process.env.API_ROOT_URL}/components?${query}`;
  const controller = new AbortController();
  const { signal } = controller;
  setTimeout(() => controller.abort(), 5000);
  const options = {
    headers: {
      Accept: 'application/json',
    },
    credentials: 'include', // Support XHR with basic auth.
    signal,
  };

  const response = await fetch(apiUrl, { ...options });
  console.log({ response });
  const data = await response.json();
  const { redirectTo, redirectStatus } = data;

  if (isNode() && redirectTo) {
    // Execute request without automatic redirect resolution, so we can
    // intercept and cascade the redirect down to the client.
    return {
      defaults: [],
      page: [],
      providers: [],
      status: response.status,
      redirectTo,
      redirectStatus,
    };
  }

  // Abort if error is encountered, except 404s, which we will handle ourselves.
  if (
    ! response.ok &&
    ! redirectTo &&
    404 !== response.status
  ) {
    throw new Error(`API error: ${data.message}`);
  }

  return {
    ...data,
    status: response.status,
    redirectTo,
  };
}

/**
 * Cache fetchComponents responses. Return cached response if available.
 * @param {array} args - fetchComponents arguments
 * @returns {Promise<{object}>} - fetchComponents return value
 */
export default async function cacheResult(...args) {
  const cache = getService();
  const key = args.toString();
  const info = { cached: false, route: args };

  let response = await cache.get(key);
  if (! response) {
    log.info(info);
    response = await fetchComponents(...args);
    await cache.set(key, response);
  } else {
    log.info('%o', { ...info, cached: true });
  }

  return response;
}
