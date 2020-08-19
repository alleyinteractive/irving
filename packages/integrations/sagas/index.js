import picoSaga from './picoSaga';

/**
 * Combine all sagas, and run them continuously in parallel.
 */
export default [
  ...picoSaga,
];
