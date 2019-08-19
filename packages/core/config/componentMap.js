import Body from 'components/body';
import Head from 'components/head';
import Image from 'components/image/image';
import NotConfigured from 'components/notConfigured';
import RawHTML from 'components/rawHTML';
import Placeholder from 'components/placeholder';
import withLoader from 'components/hoc/withLoader';
import getIrvingConfig from 'utils/getIrvingConfig';

const irvingConfig = getIrvingConfig();

/**
 * Defines which React component to render for each received API component.
 */
export const componentMap = {
  body: withLoader(Body),
  embed: RawHTML,
  head: Head,
  header: Placeholder,
  html: RawHTML,
  image: Image,
  // Include user-configured componentMap after core components,
  // so user can override core components if they want to.
  ...irvingConfig.componentMap,
};

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
