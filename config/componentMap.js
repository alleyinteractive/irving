import NotConfigured from 'components/notConfigured';
import Placeholder from 'components/placeholder';
import Image from 'components/image';
import Head from 'components/head';
import RawHTML from 'components/rawHTML';

/**
 * Defines which React component to render for each received API component.
 */
export const componentMap = {
  header: Placeholder,
  'admin-bar': Placeholder,
  body: Placeholder,
  footer: Placeholder,
  menu: Placeholder,
  'menu-item': Placeholder,
  image: Image,
  head: Head,
  rawHTML: RawHTML,
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

  const VALID_TAG_REGEX = /^[a-zA-Z][a-zA-Z:_\.\-\d]*$/; // eslint-disable-line no-useless-escape
  if (VALID_TAG_REGEX.test(name)) {
    return name;
  }

  return NotConfigured;
}
