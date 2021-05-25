import get from 'lodash/fp/get';
import set from 'lodash/fp/set';
import {
  RECEIVE_COMPONENTS,
  FINISH_LOADING,
} from 'actions/types';
import getRouteKey from 'selectors/getRouteKey';

/**
 * Handle redux state changes for a single provider.
 *
 * @param {object} providerState Redux state for a single provider.
 * @param {object} provider New provider payload.
 * @returns {object} The updated Redux state
 */
export const providerReducer = (providerState, provider) => {
  const { config, children } = provider;
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
  if (!newState[providerKey]) {
    newState[providerKey] = {
      config,
      children,
    };
  }

  // Reset currrent config value.
  if (providerKey !== newState.current.key) {
    newState.current = {
      key: providerKey,
      config,
      children,
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
  const {
    type,
    payload,
  } = action;

  const routeKey = getRouteKey(state);
  const currentProviders = get('components.providers', state);
  const { providers } = payload || {};
  let newProviders;

  switch (type) {
    case FINISH_LOADING:
      // Return all providers current value or route key if no payload is present.
      newProviders = Object.keys(currentProviders)
        .reduce((acc, name) => {
          const provider = currentProviders[name];
          const current = provider[routeKey]
            ? provider[routeKey] : provider.current;

          return {
            ...acc,
            [name]: {
              ...provider,
              current,
            },
          };
        }, {});
      break;

    case RECEIVE_COMPONENTS:
      newProviders = providers.reduce((acc, provider) => {
        const newProvider = provider;
        const {
          name,
          config: { providerKey },
        } = newProvider;

        // If user specifies 'route' as they provider data key,
        // key new data for every route change.
        if (providerKey === 'route') {
          newProvider.config.providerKey = routeKey;
        }

        const currentState = acc[name];

        return {
          ...acc,
          [name]: providerReducer(
            currentState,
            newProvider,
          ),
        };
      }, currentProviders);
      break;

    default:
      newProviders = currentProviders;
  }

  return set('components.providers', newProviders, state);
}
