import getAppTemplateVars from './server/getAppTemplateVars';
import ssrTags from './server/ssrTags';
import waitForClientRender from './client/waitForClientRender';

// Export config
export default {
  name: 'loadable',
  getAppTemplateVars,
  waitForClientRender,
  ssrTags,
};
