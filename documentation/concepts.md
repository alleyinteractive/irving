### Request Flow
[Diagram](https://drive.google.com/open?id=1nRoICa0niPGIsP-YmyeCB_GhnHF3d3YM)

### Redux.js
We use [Redux.js](https://github.com/reduxjs/redux) to contain the application's state and leverage its API for introducing changes and selecting values in a consistent manner. The primary state fields include the current route data and the data components for each visited URL path. Various global stateful UI elements, such as loading indicators and modals, are also represented within the Redux.js state.

### Reducer Types
#### State Reducers
A reducer function that takes the entire state object as an argument and returns the transformed state based on the dispatched action. This type of reducer is used when you want to change multiple fields of the state object within one function. State reducers are composed together in a chain. Each reducer is passed the result of the previous reducer.

[Example state reducer.](https://github.com/alleyinteractive/irving/blob/production/reducers/componentsReducer.js)

#### Slice Reducer
A reducer function that operates on only one root field of the state object. Slice reducers are typically used for simpler action handling logic. All slice reducers are composed together with another reducer function called combineReducers which is exported by Redux.js. The combineReducers function is then composed with the rest of the state reducers.
Example link

### React Redux and Connected Roots
The API response from a components request is represented as a tree. Each root of the tree is connected to the Redux store with [React-Redux.js](https://github.com/reduxjs/react-redux). The interface of the components API response dictates that 0 or more root components may change when a LOCATION_CHANGE action is dispatched when a user navigates to a new page. To meet the requirements of completely dynamic pages, without re-rendering the entire component tree on each new page view, component roots are connected to Redux.js independent from each other. This allows only the root components that change, and their corresponding children, to re-render.

[Example slice reducer.](https://github.com/alleyinteractive/irving/blob/production/reducers/componentsReducer.js)

### Selectors
Selectors are functions that compute values from the Redux.js state. We use the [Reselect.js](https://github.com/reduxjs/reselect) library to create performant selectors. The main feature of reselect is that it allows memoization of selector functions. What this means is that a complex selector function will execute the first time it is called, and then its computed value will be cached in memory. The cached value will continue to be returned until the selector's argument changes. For selectors that take the entire state as an argument, the selector will be recomputed when the Redux.js state changes. Selectors can be composed together. In that case when selectors that are passed as arguments to a composed selector change, then the composed selector will be recomputed.

Sometimes you may need a selector to take an additional argument, very often from the props of a component. This is possible by passing the props as the last argument of the selector. However, if you do this then the selector will be unable to optimally memoize it's result, because any change in that last argument will clear the cache of the selector. To get around this you should turn your selector function into a factory function, that is return a selector function from a function call. This allows you to create independently operating reusable selector functions.

[Example factory function selector.](https://github.com/alleyinteractive/irving/blob/production/selectors/createGetRootComponent.js)

### Why Redux-Saga.js?
Sagas provide a comprehensive way to manage asynchronous operations and side effects. The primary reason sagas were chosen over using only promises, is because sagas enable the ability to pause, resume, or cancel operations. With a promise there is no stopping the operation when it begins. This type of control becomes necessary for an app like Irving, which is driven by the state of the URL. When a user navigates to a new page, a saga will hook into that dispatched action and then execute the logic for resolving the page. If the user then navigates to another page, before the original request was completely resolved, the original saga will be canceled automatically. Thus redundant operations are eliminated.

Other advantages of [Redux-Saga.js](https://github.com/redux-saga/redux-saga) include generator syntax, which allows you to code in a synchronous style, much like async-await, which facilitates things like error handling with a traditional try-catch. Another advantage is the API of effects that is exported by Redux-Saga.js. Effects describe what operations you want to happen, but they don't actually execute them. The Redux-Saga.js middleware handles that. This allows you to unit test the logic of sagas without having to deal with or mock the side effects that occur from those effects.

### Dev Mode
When Irving is run in dev mode a different set of Express.js middleware is loaded to help facilitate the expected development experience. The involved middleware are the same middleware that power webpack-dev-server.js.

#### [webpack-dev-middleware.js](https://github.com/webpack/webpack-dev-middleware)
This middleware takes a Webpack.js instance with Irving's Webpack.js configuration as an argument. It will handle compiling assets for both server and browser bundles, as well as hosting the assets for the browser to request.

#### [webpack-hot-middleware.js](https://github.com/webpack-contrib/webpack-hot-middleware)
This middleware creates a websocket connection to the browser and allows hot module replacement for React components and CSS modules.

#### [webpack-hot-server-middleware.js](https://github.com/60frames/webpack-hot-server-middleware)
When a JS module changes the only traditional way to reload that change would be to restart the Node.js server. This is not a good experience, because whenever the server restarts the Express.js middleware that supports hosting assets and HMR for the client will be reset as well. This take a considerable amount of time to execute as well as requiring a browser refresh. This middleware solves that problem by re-requiring the module that change in Node.js. It does this by deleting the reference to the module in the module cache and then requiring it again.

#### nodemon.json
In dev move the app is run within [Nodemon.js](https://github.com/remy/nodemon). There is a special Nodemon.js configuration that targets only files that are execute on the server. If one of those files change the entire server must restart, and that will be automatically handled for you.
