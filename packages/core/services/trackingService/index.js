import defaultService from './defaultService';

/**
 * Create a tracker that will handle the events baked into Irving components.
 * Default service is mostly a no-op, can be replaced with @irvingjs/tracking.
 *
 * @return {function} A tracking function.
 */
const getService = defaultService;

export default getService;
