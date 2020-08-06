import unset from 'lodash/fp/unset';
import getValueFromConfig from 'config/irving/getValueFromConfig';

const encodeState = (state) => {
  const unsetPaths = getValueFromConfig(
    'preloadedStateDenylist',
    ['route.cookie']
  );
  const sanitizedState = unsetPaths.reduce(
    (acc, path) => unset(path, acc),
    state
  );

  // https://redux.js.org/recipes/server-rendering#security-considerations
  return JSON.stringify(sanitizedState)
    .replace(/</g, '\\u003c');
};

export default encodeState;
