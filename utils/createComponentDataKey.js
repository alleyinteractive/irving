import { replace } from 'lodash/fp';

/**
 * Create a unique key for use in global state for components with external data.
 *
 * @returns {string} - Key
 */
const createComponentDataKey = (endpoint) => (
  replace(/\./g, '%2E', endpoint)
);

export default createComponentDataKey;
