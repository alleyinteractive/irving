import { combineReducers } from 'redux';
import integrationsReducer from './integrationsReducer';
import coralReducer from './coralReducer';
import picoReducer from './picoReducer';

// TODO: implement custom reducer logic to conditionally load Coral & Pico
// reducers based on whether or not they appear in the manager's componentMap.
const combinedReducers = combineReducers({
  manager: integrationsReducer,
  coral: coralReducer,
  pico: picoReducer,
});

export default {
  integrations: combinedReducers,
};
