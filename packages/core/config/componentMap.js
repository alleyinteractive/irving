import DefaultAppContent from 'components/app/defaultAppContent';
import DefaultErrorMessage from 'components/defaultErrorMessage';
import NotConfigured from 'components/notConfigured';
import userComponentMap from '@irvingjs/componentMap';

const componentMap = {
  app: DefaultAppContent,
  'error-message': DefaultErrorMessage,
  ...userComponentMap,
};

/**
 * Resolve a defined React component by name.
 *
 * @param {string} name - component name
 * @param {string} FallbackComponent - component to fall back to if not configured.
 * @returns {function} - React component
 */
export default function getComponent(
  name,
  FallbackComponent = NotConfigured
) {
  // Custom component
  if (componentMap[name]) {
    return componentMap[name];
  }

  // Support standard html tag name.
  const VALID_TAG_REGEX = /^[a-zA-Z][a-zA-Z:_\.\-\d]*$/; // eslint-disable-line no-useless-escape
  if (VALID_TAG_REGEX.test(name)) {
    return name;
  }

  return FallbackComponent;
};

if (module.hot) {
  module.hot.accept();
}
