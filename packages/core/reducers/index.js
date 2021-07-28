import { combineReducers } from 'redux';
import reduceReducers from 'reduce-reducers';
import defaultState from './defaultState';
import {
  getValueFromConfig,
} from '../config/irving/getValueFromConfig';
import componentsReducer from './componentsReducer';
import providersReducer from './providersReducer';
import routeReducer from './routeReducer';
import errorReducer from './errorReducer';
import loadingReducer from './loadingReducer';
import visibilityReducer from './visibilityReducer';

// Configure "slice" reducers.
export const reducers = getValueFromConfig('reducers', {
  components: (state = defaultState.components) => state,
  error: errorReducer,
  loading: loadingReducer,
  route: routeReducer,
  visible: visibilityReducer,
});
const rootSliceReducer = combineReducers(reducers);

// "State" reducers are composed together. The order they are passed into
// reduceReducers determines the order they will be run in.
const rootReducer = reduceReducers(
  defaultState,
  rootSliceReducer,
  componentsReducer,
  providersReducer,
);

export default rootReducer;
