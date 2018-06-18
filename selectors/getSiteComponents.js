import get from 'lodash/fp/get';
import { createSelector } from 'reselect';

/**
 * Select the components to render.
 * @param {object} state - Redux state
 * @returns {function[]}
 */
const getSiteComponents = createSelector(get('components.site'), () => {
  // we need to get page overrides
  // how will that affect re-render?
});

export default getSiteComponents;

