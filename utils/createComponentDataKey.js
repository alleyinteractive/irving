import { replace } from 'lodash/fp';

/**
 * Create a unique key for use in global state for components with external data.
 * This function is in part necessary to prevent calls to lodash/set from breaking due to
 * `.` characters within the key.
 *
 * @returns {string} - Key
 */
const createComponentDataKey = (endpoint) => (
  replace(/\./g, '%2E', endpoint)
);

export default createComponentDataKey;
