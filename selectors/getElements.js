import React from 'react';
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
 *
 * @param {object} component - api component object
 * @return {object} - React Element
 */
const toReactElement = (component) => {
  const { name, config, children } = component;
  return React.createElement(
    getReactComponent(name),
    { ...config, name, key: name },
    children.map(toReactElement)
  );
};

/**
 * Get the components to be rendered in the app root.
 * (defaults unless replaced by an override)
 * @param {object} state - Redux state
 * @return {object[]} - array of component objects
 */
export const getElements = createSelector(
  [
    get('components.defaults'),
    getPageComponents,
  ],
  (defaults, pageComponents) => defaults.map((component) => {
    const override = find({ name: component.name }, pageComponents);
    return toReactElement(override || component);
  }),
);

export default getElements;
