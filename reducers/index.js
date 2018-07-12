import { combineReducers } from 'redux';
import reduceReducers from 'reduce-reducers';
import defaultState from 'reducers/defaultState';
import componentsReducer from './componentsReducer';
import routeReducer from './routeReducer';
import errorReducer from './errorReducer';

// Configure "slice" reducers.
const rootSliceReducer = combineReducers({
  components: (state = defaultState.components) => state,
  route: routeReducer,
  error: errorReducer,
});

// "State" reducers are composed together. The order they are passed into
// reduceReducers determines the order they will be run in.
const rootReducer = reduceReducers(rootSliceReducer, componentsReducer);

export default rootReducer;
