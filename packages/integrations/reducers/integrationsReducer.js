import merge from 'lodash/fp/merge';
import { HYDRATE_COMPONENTS } from '../actions/types';
import { manager as defaultState } from './defaultState';

/**
 * Handle Redux actions operating on the integrations state slice.
 * @param {object} integrationsState - Integrations state slice.
 * @param {{type payload}} action -  The Redux action.
 * @returns {object} The updated integrations state.
 */
export default function integrationsReducer(
  state = defaultState,
  { type, payload }
) {
  switch (type) {
    case HYDRATE_COMPONENTS:
      return merge(state, { componentMap: payload, hydrated: true });

    case LOCATION_CHANGE:
      payload.map((component, idx) => {
        if (component.config.shouldRerender) {
          set(
            `state.componentMap[${idx}]`,
            { ...component }
          );
        }
      });

    default:
      return state;
  }
}
