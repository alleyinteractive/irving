import unset from 'lodash/fp/unset';
import { getValueFromConfig } from 'config/irving/getValueFromConfig';
import preloadedStateDenylist from 'config/preloadedStateDenylist';

const encodeState = (state) => {
  const unsetConfigs = getValueFromConfig(
    'preloadedStateDenylist',
    preloadedStateDenylist
  );
  const sanitizedState = unsetConfigs.reduce(
    (acc, config) => unset(config.key, acc),
    state
  );

  // https://redux.js.org/recipes/server-rendering#security-considerations
  return JSON.stringify(sanitizedState)
    .replace(/</g, '\\u003c');
};

export default encodeState;
