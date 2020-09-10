import { isString, omit } from 'lodash/fp';
import React from 'react';
import getReactComponent from 'config/componentMap';
import { getValueFromConfig } from 'config/irving/getValueFromConfig';

/**
 * Recursively map a tree of API components within component groups to React elements.
 *
 * @param {object} componentGroups ComponentGroups object
 * @return {object} React Element
 */
export function createComponentGroups(componentGroups) {
  return Object.keys(componentGroups)
    .reduce((acc, groupKey) => {
      let convertedComponents = componentGroups[groupKey];

      if (convertedComponents.length) {
        convertedComponents = convertedComponents
          .map((component, index) => (
            // Support text nodes.
            isString(component) ? component : toReactElement(
              component,
              String(index)
            )
          ));
      }

      return {
        ...acc,
        [groupKey]: convertedComponents,
      };
    }, {});
}

/**
 * Recursively map a tree of API components to React elements.
 * @param {object} apiComponent - api component object
 * @param {string} keyPrefix
 * @return {object} - React Element
 */
export default function toReactElement(
  apiComponent,
  keyPrefix = '',
  recursive = true
) {
  const {
    name,
    _alias: alias = '',
    config,
    children,
    componentGroups = {},
  } = apiComponent;

  // Convert component groups.
  const convertedGroups = createComponentGroups(componentGroups);

  let props = {
    ...config,
    componentName: name,
    componentGroups: convertedGroups,
    key: `${keyPrefix}_${name}`,
  };

  // Recursively convert children to react elements.
  const childElements = recursive ?
    children.map((child, index) => (
      // Support text nodes.
      isString(child) ? child : toReactElement(child, String(index))
    )) : children;

  const type = 0 !== alias.length ?
    getReactComponent(alias) :
    getReactComponent(name);

  const checkShouldOmitFunctions = getValueFromConfig(
    'shouldOmitIrvingProps',
    [(componentType) => 'string' === typeof componentType]
  );
  const shouldOmitIrvingProps = checkShouldOmitFunctions
    .some((validationFunction) => (
      validationFunction(type, props)
    ));

  if (shouldOmitIrvingProps) {
    // Strip invalid attributes for native dom elements.
    props = omit([
      'componentName',
      'componentGroups',
      'themeName',
      'themeOptions',
    ], props);

    // Support self closing tags.
    if (! childElements.length) {
      return React.createElement(type, props);
    }
  }

  return React.createElement(type, props, childElements);
}
