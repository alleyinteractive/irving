# Sagas
[Redux Saga](https://redux-saga.js.org)
* [componentDataSaga.js](https://github.com/alleyinteractive/irving/blob/production/sagas/componentDataSaga.js) - Side effect manager for fetching asyncronously loaded, component-specific data (via the [withData HOC](https://github.com/alleyinteractive/irving/tree/production/components/hoc/withData))
* [formSaga.js](https://github.com/alleyinteractive/irving/blob/production/sagas/formSaga.js) - Manages side effects related to form submission and validation response from your CMS backend.
* [index.js](https://github.com/alleyinteractive/irving/blob/production/sagas/index.js) - Primary sagas file responsible for importing and composing all other sagas into the top level `rootSaga`.
* [onLocationChange.js](https://github.com/alleyinteractive/irving/blob/production/sagas/onLocationChange.js) - Manages side effects that must be triggered on the `LOCATION_CHANGE` action. This can be used to fire off GA pageviews, for example.
* [resolveComponents.js](https://github.com/alleyinteractive/irving/blob/production/sagas/resolveComponents.js) - Side effect manager for fetching data from the primary Irving components endpoint. 
* [waitToScroll.js](https://github.com/alleyinteractive/irving/blob/production/sagas/waitToScroll.js) - Manages side effects for scrolling down to the appropriate tag corresponding to the current URL hash.
