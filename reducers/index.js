import { combineReducers } from 'redux';
import reduceReducers from 'reduce-reducers';
import defaultState from 'reducers/defaultState';
import { persistReducer } from 'redux-persist';
import browserStorage from 'redux-persist/lib/storage';
import componentsReducer from './componentsReducer';
import routeReducer from './routeReducer';
import errorReducer from './errorReducer';
import loadingReducer from './loadingReducer';
import visibilityReducer from './visibilityReducer';
import componentDataReducer from './componentDataReducer';
import playerReducer from './playerReducer';
import storyReducer from './storyReducer';
import headerHeightReducer from './headerHeightReducer';
import zephrReducer from './zephrReducer';

const zephrPersistConfig = {
  key: 'zephr',
  storage: browserStorage,
  blacklist: ['forms'],
};

// Configure "slice" reducers.
export const reducers = {
  components: (state = defaultState.components) => state,
  componentData: componentDataReducer,
  error: errorReducer,
  loading: loadingReducer,
  player: playerReducer,
  route: routeReducer,
  visible: visibilityReducer,
  story: storyReducer,
  headerHeight: headerHeightReducer,
  zephr: persistReducer(zephrPersistConfig, zephrReducer),
};
const rootSliceReducer = combineReducers(reducers);

// "State" reducers are composed together. The order they are passed into
// reduceReducers determines the order they will be run in.
const rootReducer = reduceReducers(rootSliceReducer, componentsReducer);

export default rootReducer;
