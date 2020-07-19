import DefaultAppContent from 'components/app/defaultAppContent';
import DefaultErrorMessage from 'components/defaultErrorMessage';
import NotConfigured from 'components/notConfigured';
import Body from 'components/body';
import withLoader from 'components/hoc/withLoader';
import userComponentMap from '@irvingjs/componentMap';

const defaultComponents = {
  app: DefaultAppContent,
  body: withLoader(Body),
  'error-message': DefaultErrorMessage,
};

/**
 * Create a getComponent function that contains a memoized copy of the componentMap.
 *
 * @returns {function} - getComponent function.
 */
function createGetComponent() {
  // Merge user component map into defaults.
  const componentMap = {
    ...defaultComponents,
    ...userComponentMap,
  };

  /**
   * Resolve a defined React component by name.
   *
   * @param {string} name - component name
   * @returns {function} - React component
   */
  return function getComponent(name) {
    // Custom component
    if (componentMap[name]) {
      return componentMap[name];
    }

    // Support standard html tag name.
    const VALID_TAG_REGEX = /^[a-zA-Z][a-zA-Z:_\.\-\d]*$/; // eslint-disable-line no-useless-escape
    if (VALID_TAG_REGEX.test(name)) {
      return name;
    }

    return NotConfigured;
  };
}

export default createGetComponent();

if (module.hot) {
  module.hot.accept();
}
