import { combineReducers } from 'redux';
import reduceReducers from 'reduce-reducers';
import defaultState from 'reducers/defaultState';
import componentsReducer from './componentsReducer';
import routeReducer from './routeReducer';
import errorReducer from './errorReducer';
import loadingReducer from './loadingReducer';
import visibilityReducer from './visibilityReducer';
import componentDataReducer from './componentDataReducer';
import playerReducer from './playerReducer';
import userReducer from './userReducer';
import storyReducer from './storyReducer';
import headerHeightReducer from './headerHeightReducer';
import zephrReducer from './zephrReducer';
import zephrRulesReducer from './zephrRulesReducer';

// Configure "slice" reducers.
export const reducers = {
  components: (state = defaultState.components) => state,
  componentData: componentDataReducer,
  error: errorReducer,
  loading: loadingReducer,
  player: playerReducer,
  route: routeReducer,
  visible: visibilityReducer,
  user: userReducer,
  story: storyReducer,
  headerHeight: headerHeightReducer,
  zephr: zephrReducer,
  zephrRules: zephrRulesReducer,
};
const rootSliceReducer = combineReducers(reducers);

// "State" reducers are composed together. The order they are passed into
// reduceReducers determines the order they will be run in.
const rootReducer = reduceReducers(rootSliceReducer, componentsReducer);

export default rootReducer;
