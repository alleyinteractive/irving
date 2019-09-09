import NotConfigured from 'components/notConfigured';
import getIrvingConfig from 'utils/getIrvingConfig';

const irvingConfig = getIrvingConfig();
const { componentMap } = irvingConfig;

/**
 * Resolve a defined React component by name.
 *
 * @param {string} name - component name
 * @returns {function} - React component
 */
export default function getComponent(name) {
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
}
