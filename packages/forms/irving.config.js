import getSagas from './sagas';
import getReducers from './reducers';
import getDefaultState from './reducers/defaultState';

export default {
  sagas: getSagas,
  reducers: getReducers,
  defaultState: getDefaultState,
};
