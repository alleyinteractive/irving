/**
 * The @loadable/server package will handle loading of all client-side webpack
 * assets into the server template on its own, removing the need for core's logic doing the same.
 */
/* eslint-disable global-require, import/no-dynamic-require */
const ssrTags = (tags) => {
  if (
    'development_server' === process.env.IRVING_EXECUTION_CONTEXT ||
    'production_server' === process.env.IRVING_EXECUTION_CONTEXT
  ) {
    const filterCoreTags = require('./filterCoreTags');

    return filterCoreTags(tags, true);
  }

  return tags;
};

export default ssrTags;
