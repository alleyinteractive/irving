import getReducers from './reducers';
import getSagas from './sagas';
import Fieldset from './components/fieldset';
import Input from './components/input';
import Label from './components/label';
import State from './components/state';

export default {
  reducers: getReducers,
  sagas: getSagas,
};

export {
  Fieldset,
  Input,
  Label,
  State,
};
