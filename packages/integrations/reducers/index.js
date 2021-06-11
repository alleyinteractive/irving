import { combineReducers } from 'redux';
import integrationsReducer from './integrationsReducer';
import coralReducer from './coralReducer';
import picoReducer from './picoReducer';
import gtmReducer from './gtmReducer';

// TODO: implement custom reducer logic to conditionally load Coral & Pico
// reducers based on whether or not they appear in the manager's componentMap.
const combinedReducers = combineReducers({
  manager: integrationsReducer,
  coral: coralReducer,
  pico: picoReducer,
  gtm: gtmReducer,
});

export default {
  integrations: combinedReducers,
};
