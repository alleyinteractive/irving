import { combineReducers } from 'redux';
import reduceReducers from 'reduce-reducers';
import defaultState from 'reducers/defaultState';
import { persistReducer } from 'redux-persist';
import browserStorage from 'redux-persist/lib/storage';
import componentDataReducer from './componentDataReducer';
import componentsReducer from './componentsReducer';
import contentPositionReducer from './contentPositionReducer';
import dismissNoticeReducer from './dismissNoticeReducer';
import errorReducer from './errorReducer';
import headerHeightReducer from './headerHeightReducer';
import loadingReducer from './loadingReducer';
import playerReducer from './playerReducer';
import routeReducer from './routeReducer';
import storyReducer from './storyReducer';
import visibilityReducer from './visibilityReducer';
import zephrDataLayerReducer from './zephrDataLayerReducer';
import zephrReducer from './zephrReducer';
import zephrRulesReducer from './zephrRulesReducer';

const zephrPersistConfig = {
  key: 'zephr',
  storage: browserStorage,
  blacklist: ['forms'],
};

// Configure "slice" reducers.
export const reducers = {
  componentData: componentDataReducer,
  components: (state = defaultState.components) => state,
  contentPosition: contentPositionReducer,
  error: errorReducer,
  headerHeight: headerHeightReducer,
  isNoticeVisible: dismissNoticeReducer,
  loading: loadingReducer,
  player: playerReducer,
  route: routeReducer,
  story: storyReducer,
  visible: visibilityReducer,
  zephr: persistReducer(zephrPersistConfig, zephrReducer),
  zephrDataLayer: zephrDataLayerReducer,
  zephrRules: zephrRulesReducer,
};
const rootSliceReducer = combineReducers(reducers);

// "State" reducers are composed together. The order they are passed into
// reduceReducers determines the order they will be run in.
const rootReducer = reduceReducers(rootSliceReducer, componentsReducer);

export default rootReducer;
