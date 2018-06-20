import { get } from 'lodash/fp';
import { createSelector } from 'reselect';

/**
 * Create a selector that will return the root api component by the component's
 * name. If a page specific override exists, that will be returned instead of
 * the default.
 * @returns {function} - Redux selector
 */
const createGetRootComponent = () => createSelector(
  [
    get('components.defaults'),
    get('route.pathname'),
    get('components.page'),
    (state, props) => props.name,
  ],
  (defaults, pathname, pageMap, name) => {
    const pageComponents = pageMap[pathname] || [];
    const matchComponent = (component) => component.name === name;
    const pageOverride = pageComponents.find(matchComponent);
    if (pageOverride) {
      return pageOverride;
    }

    return defaults.find(matchComponent);
  }
);

export default createGetRootComponent;
