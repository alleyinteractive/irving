import { combineReducers } from 'redux';
import reduceReducers from 'reduce-reducers';
import defaultState from 'reducers/defaultState';
import componentsReducer from './componentsReducer';
import routeReducer from './routeReducer';

// Configure "slice" reducers.
const rootSliceReducer = combineReducers({
  components: (state = defaultState.components) => state,
  route: routeReducer,
});

// "State" reducers are composed together. The order they are passed into
// reduceReducers determines the order they will be run in.
const rootReducer = reduceReducers(rootSliceReducer, componentsReducer);

export default rootReducer;

// how do we structure the reducers
// how do we map the data to components
// sagas
