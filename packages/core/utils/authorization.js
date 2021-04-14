import get from 'lodash/fp/get';
import isNode from './isNode';

/**
 * Retrieve the appropriate token cookie.
 *
 * @param {object} cookie Object containing valid cookies for the app.
 */
export const getAuthToken = (cookie) => {
  const bearerToken = get('authorizationBearerToken', cookie);
  const basicToken = get('authorizationBasicToken', cookie);

  return bearerToken || basicToken;
};

/**
 * Merge appropriate fetch options for the auth token in use.
 *
 * @param {object} cookie Object containing valid cookies for the app.
 * @param {object} fetchOptions Existing fetch options to which auth will be added.
 */
 export const maybeMergeAuthHeaders = (cookie, fetchOptions = {}) => {
  const bearerToken = get('authorizationBearerToken', cookie);
  const basicToken = get('authorizationBasicToken', cookie);
  let authHeaderValue;

  if (bearerToken) {
    authHeaderValue = `Bearer ${bearerToken}`;
  } else if (basicToken) {
    authHeaderValue = `Basic ${basicToken}`;
  }

  if (authHeaderValue) {
    return {
      ...fetchOptions,
      credentials: 'same-origin',
      headers: {
        ...fetchOptions.headers,
        Authorization: authHeaderValue,
      },
    };
  }

  return fetchOptions;
};

/**
 * Determine if we should check if user is authorized (and make an authorized request).
 * We are only doing this client side to bypass edge caching on SSR.
 *
 * @param {object} cookie Object containing valid cookies for the app.
 */
export const shouldAuthorize = (cookie) => {
  const authToken = getAuthToken(cookie);

  return (authToken && ! isNode()) ? true : false;
};
