import { get, find } from 'lodash/fp';
import { createSelector } from 'reselect';
import getReactComponent from 'config/componentMap';

/**
 * Get the components specific to the current page.
 * @param {object} state - Redux state
 * @return {object[]} - array of component objects
 */
export const getPageComponents = createSelector(
  [
    get('route.pathname'),
    get('components.page'),
  ],
  (key, pageMap) => pageMap[key] || [],
);

/**
 * Get the components to be rendered in the body area.
 * (page components minus overrides)
 * @param {object} state - Redux state
 * @return {object[]} - array of component objects
 */
export const getBodyComponents = createSelector(
  [
    get('components.defaults'),
    getPageComponents,
  ],
  (defaults, pageComponents) => pageComponents.filter((component) => {
    const isOverride = find({ name: component.name }, defaults);
    return ! isOverride;
  })
);

/**
 * Get the components to be rendered in the app root.
 * (defaults unless replaced by an override)
 * @param {object} state - Redux state
 * @return {object[]} - array of component objects
 */
export const getRootComponents = createSelector(
  [
    get('components.defaults'),
    getPageComponents,
  ],
  (defaults, pageComponents) => defaults.map((component) => {
    const override = find({ name: component.name }, pageComponents);
    return override || component;
  }),
);

/**
 * @param {object} state - Redux state
 * @return {object[]} - array of React components
 */
export const getRootReactComponents = createSelector(
  [
    getRootComponents,
  ],
  (components) => components.map((component) => ({
    key: component.name, // it is assumed that the root level components are unique
    Component: getReactComponent(component.name),
  })),
);
