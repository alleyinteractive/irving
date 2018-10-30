import NotConfigured from 'components/notConfigured';
import Placeholder from 'components/placeholder';
import Image from 'components/image';
import Head from 'components/head';
import RawHTML from 'components/rawHTML';
import SocialList from 'components/socialList';
import SocialItem from 'components/socialItem';
import withLoader from 'components/hoc/withLoader';

/**
 * Defines which React component to render for each received API component.
 */
export const componentMap = {
  header: Placeholder,
  'admin-bar': Placeholder,
  body: withLoader(Placeholder),
  embed: RawHTML,
  footer: Placeholder,
  menu: Placeholder,
  'menu-item': Placeholder,
  image: Image,
  head: Head,
  html: RawHTML,
  'social-links': SocialList,
  'social-share': SocialList,
  'social-item': SocialItem,
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
