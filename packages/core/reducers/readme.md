# Reducers
[React Reducers](https://redux.js.org/basics/reducers)
* [componentDataReducer.js](https://github.com/alleyinteractive/irving/blob/production/reducers/componentDataReducer.js) - Handles actions and state changes related to asyncronously loaded, component-specific data (triggered via the [withData HOC](https://github.com/alleyinteractive/irving/tree/production/components/hoc/withData))
* [componentsReducer.js](https://github.com/alleyinteractive/irving/blob/production/reducers/componentsReducer.js) - Handles actions and state changes related to responses from the primary Irving components API. Note that this is not a slice reducer–it will ingest the entire state.
* [componentsReducer.test.js](https://github.com/alleyinteractive/irving/blob/production/reducers/componentsReducer.test.js) - unit tests for `componentsReducer`. 
* [createFormReducer.js](https://github.com/alleyinteractive/irving/blob/production/reducers/createFormReducer.js) - Helper function for creating a form reducer. Takes in the form name as an argument and returns the appropriate reducer function. The returned reducer should handle a state slice for which the key is the same form name. Example:
```javascript
const reducers = {
  ...
  formName: createFormReducer('formName'),
};
```
* [defaultState.js](https://github.com/alleyinteractive/irving/blob/production/reducers/defaultState.js) - Default global state. This file should be used in all reducers.
* [errorReducer.js](https://github.com/alleyinteractive/irving/blob/production/reducers/errorReducer.js) - Handles actions and state changes related to app-level errors.
* [index.js](https://github.com/alleyinteractive/irving/blob/production/reducers/index.js) - File containing imports for all other reducers and logic for combining and composing them into the top level `rootReducer`.
* [loadingReducer.js](https://github.com/alleyinteractive/irving/blob/production/reducers/loadingReducer.js) - Handles actions and state changes related to app-level loading state.
* [playerReducer.js](https://github.com/alleyinteractive/irving/blob/production/reducers/playerReducer.js) - Handles actions and state changes related to Irving's built-in persistent audio player.
* [routeReducer.js](https://github.com/alleyinteractive/irving/blob/production/reducers/routeReducer.js) - Handles the `LOCATION_CHANGE`, `RECEIVE_COMPONENTS`, and `RECEIVE_ERROR` actions and updates global state with metadata about the current route.
* [visibilityReducer.js](https://github.com/alleyinteractive/irving/blob/production/reducers/visibilityReducer.js) - Handles boolean state changes related to the current visibility of particular components on the site.
* [visibilityReducer.test.js](https://github.com/alleyinteractive/irving/blob/production/reducers/visibilityReducer.test.js).  - Unit tests for the visibility reducer
