import get from 'lodash/fp/get';
import set from 'lodash/fp/set';
import { RECEIVE_COMPONENTS } from 'actions/types';

const defaultProviderState = {
  current: {
    key: '',
    config: {},
  },
};

const defaultProviderKey = 'default';

/**
 * Handle redux state changes for a single provider.
 *
 * @param {object} state Redux state for a single provider.
 * @param {object} provider New provider payload.
 * @returns {object} The updated Redux state
 */
export const providerReducer = (state = defaultProviderState, provider) => {
  const { config } = provider;
  const {
    providerKey = defaultProviderKey,
  } = config;
  const newState = state;

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
    const { name } = provider;
    const currentState = acc[name];

    return {
      ...acc,
      [name]: providerReducer(
        currentState,
        provider
      ),
    };
  }, currentProviders);

  return set('components.providers', newProviders, state);
}
