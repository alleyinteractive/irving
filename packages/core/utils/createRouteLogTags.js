const pick = require('lodash/fp/pick');

const createRouteLogTags = (routeMeta, env = {}) => {
  const routeTags = pick([
    'path',
    'hostname',
    'search',
    'query',
    'context',
    'cached',
  ], routeMeta);
  const { hostname, path, search } = routeTags;
  const { ROOT_URL, API_ROOT_URL, SITE_SLUG } = env;
  const tags = {
    ROOT_URL,
    API_ROOT_URL,
    SITE_SLUG,
    ...routeTags,
  };

  // Combine some route meta for an error URL.
  if (hostname) {
    tags.errorUrl = `${hostname}${path}${'?' !== search ? search : ''}`;
  }

  return tags;
};

module.exports = createRouteLogTags;
