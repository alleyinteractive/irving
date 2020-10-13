import getAppTemplateVars from './server/getAppTemplateVars';
import waitForClientRender from './client/waitForClientRender';
import ssrTags from './client/ssrTags';

// Export config
export default {
  name: 'loadable',
  getAppTemplateVars,
  waitForClientRender,
  ssrTags,
};
