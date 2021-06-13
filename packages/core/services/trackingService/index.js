import defaultService from './defaultService';

/**
 * Create a tracker that will handle the events baked into Irving components.
 *
 * @return {function} A tracking function.
 */
const getService = () => defaultService;

export default getService;
