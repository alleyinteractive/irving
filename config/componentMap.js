import AudioElement from 'components/audio';
import Body from 'components/body';
import Byline from 'components/byline';
import ContentBody from 'components/contentBody';
import ContentHeader from 'components/contentHeader';
import Disqus from 'components/disqus';
import Footer from 'components/footer';
import GoogleAnalytics from 'components/googleAnalytics';
import GoogleTagManager from 'components/googleTagManager';
import Head from 'components/head';
import Image from 'components/image/image';
import Menu from 'components/menu';
import MenuItem from 'components/menuItem';
import NotConfigured from 'components/notConfigured';
import Parsely from 'components/parsely';
import Placeholder from 'components/placeholder';
import RawHTML from 'components/rawHTML';
import SocialItem from 'components/socialItem';
import ContentFooter from 'components/contentFooter';
import SocialList from 'components/socialList';
import withLoader from 'components/hoc/withLoader';

/**
 * Defines which React component to render for each received API component.
 */
export const componentMap = {
  'admin-bar': Placeholder,
  'audio-element': AudioElement,
  body: withLoader(Body),
  byline: Byline,
  'content-header': ContentHeader,
  'content-body': ContentBody,
  'content-footer': ContentFooter,
  disqus: Disqus,
  embed: RawHTML,
  footer: Footer,
  'google-analytics': GoogleAnalytics,
  'google-tag-manager': GoogleTagManager,
  head: Head,
  header: Placeholder,
  html: RawHTML,
  image: Image,
  'mega-menu': Placeholder,
  menu: Menu,
  'menu-item': MenuItem,
  parsely: Parsely,
  'search-bar': Placeholder,
  'social-links': SocialList,
  'social-sharing': SocialList,
  'social-item': SocialItem,
  'user-greeting': Placeholder,
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
