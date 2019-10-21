import getAppTemplateVars from './server/getAppTemplateVars';
import utils from './utils';
import CssReset from './components/reset';
import * as Grid from './components/grid';

// Export config
export default {
  name: 'styled-components',
  getAppTemplateVars,
};

// Export components
export {
  utils,
  Grid,
  CssReset,
};
