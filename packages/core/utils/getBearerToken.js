import get from 'lodash/fp/get';
import isNode from './isNode';

/**
 * Determine if we should check whether or not user is authorized (and make an authorized request).
 *
 * @param {object} cookie Object containing valid cookies for the app.
 */
export default function shouldValidateAuthorization(cookie) {
  const authorizationBearerToken = get('authorizationBearerToken', cookie);
  return (authorizationBearerToken && ! isNode()) ?
    authorizationBearerToken : false;
}
