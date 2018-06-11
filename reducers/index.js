import { combineReducers } from 'redux';
import reduceReducers from 'reduce-reducers';
import componentReducer from './componentReducer';

// Configure "slice" reducers.
const rootSliceReducer = combineReducers({
  components: componentReducer,
});

// "State" reducers are composed together. The order they are passed into
// reduceReducers determines the order they will be run in.
const rootReducer = reduceReducers(rootSliceReducer);

export default rootReducer;
