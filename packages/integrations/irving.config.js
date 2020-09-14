import sagas from './sagas';
import getReducers from './reducers';
import getDefaultState from './reducers/defaultState';

export default {
  sagas,
  reducers: getReducers,
  defaultState: getDefaultState,
};
