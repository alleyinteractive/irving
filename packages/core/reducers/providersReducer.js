import get from 'lodash/fp/get';
import set from 'lodash/fp/set';
import { RECEIVE_COMPONENTS } from 'actions/types';
import getRouteKey from 'selectors/getRouteKey';

/**
 * Handle redux state changes for a single provider.
 *
 * @param {object} providerState Redux state for a single provider.
 * @param {object} provider New provider payload.
 * @returns {object} The updated Redux state
 */
export const providerReducer = (providerState, provider) => {
  const { config } = provider;
  const {
    providerKey = 'default',
  } = config;
  const newState = providerState || {
    current: {
      key: '',
      config: {},
    },
  };

  // Set a new key if hasn't been set before.
  if (! newState[providerKey]) {
    newState[providerKey] = config;
  }

  // Reset currrent config value.
  if (providerKey !== newState.current.key) {
    newState.current = {
      key: providerKey,
      config,
    };
  }

  return newState;
};

/**
 * Handle provider-related Redux actions.
 *
 * @param {object} state Redux state
 * @param {{type payload}} action Redux action
 * @returns {object} The updated Redux state
 */
export default function providersReducer(state, action) {
  const { type, payload } = action;

  if (RECEIVE_COMPONENTS !== type) {
    return state;
  }

  const currentProviders = get('components.providers', state);
  const { providers } = payload;
  const newProviders = providers.reduce((acc, provider) => {
    const newProvider = provider;
    const {
      name,
      config: { providerKey },
    } = newProvider;

    // If user specifies 'route' as they provider data key,
    // key new data for every route change.
    if ('route' === providerKey) {
      newProvider.config.providerKey = getRouteKey(state);
    }

    const currentState = acc[name];

    return {
      ...acc,
      [name]: providerReducer(
        currentState,
        newProvider
      ),
    };
  }, currentProviders);

  return set('components.providers', newProviders, state);
}
