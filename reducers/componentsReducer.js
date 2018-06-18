import { flow, reject, set } from 'lodash/fp';
import { RECEIVE_COMPONENTS } from 'actions/types';
import { CONTEXT_SITE } from 'config/constants';
import getRouteComponentOptions from 'selectors/getRouteComponentOptions';

/**
 * Handle component related Redux actions.
 * @param {object} state - Redux state
 * @param {{type payload}} action - Redux action
 * @returns {object} - The updated Redux state
 */
export default function componentReducer(state, action) { // eslint-disable-line no-unused-vars
  const { type, payload } = action;
  if (RECEIVE_COMPONENTS !== type) {
    return state;
  }

  const { path, context } = getRouteComponentOptions(state);
  const { notFound, components } = payload;
  const siteComponents = CONTEXT_SITE === context ?
    reject('page', components) :
    state.components.site;

  return flow(
    set('route.notFound', notFound),
    set(`components.${path}`, components.page.children),
    set('components.site', siteComponents)
  )(state);
}
