# Selectors
[Uses Reselect](https://redux.js.org/recipes/computing-derived-data) - [Github](https://github.com/reduxjs/reselect)

* [createGetRootComponent.js](https://github.com/alleyinteractive/irving/blob/production/selectors/createGetRootComponent.js) - Using a component name, return a top-level (root) component from the current redux state pulled in from the API components endpoint. Will return components found in `defaults` unless a `page` component of the same name exists to override it.
* [createGetRootComponent.test.js](https://github.com/alleyinteractive/irving/blob/production/selectors/createGetRootComponent.test.js) - Unit tests for the `createGetRootComponent` selector.
* [getPageComponents.js](https://github.com/alleyinteractive/irving/blob/production/selectors/getPageComponents.js) - Used by `getRootComponent` to pull out `page` components from redux state.
* [getProviders.js](https://github.com/alleyinteractive/irving/blob/production/selectors/getProviders.js) - Get components in redux state under the `providers` key.
* [getRoots.js](https://github.com/alleyinteractive/irving/blob/production/selectors/getRoots.js) - Get an array of top-level (root) component names.
* [getRouteKey.js](https://github.com/alleyinteractive/irving/blob/production/selectors/getRouteKey.js) - Transform the current route metadata into a key with which component data can be accessed in redux state.
* [getRouteMeta.js](https://github.com/alleyinteractive/irving/blob/production/selectors/getRouteMeta.js) - Get metadata about the current route from redux state.
