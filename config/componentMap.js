import AudioElement from 'components/audio';
import Body from 'components/body';
import Byline from 'components/byline';
import ContentBody from 'components/contentBody';
import ContentFooter from 'components/contentFooter';
import ContentHeader from 'components/contentHeader';
import ContentList from 'components/contentList';
import ContentListItem from 'components/contentList/contentListItem';
import Disqus from 'components/disqus';
import Footer from 'components/footer';
import GoogleAnalytics from 'components/googleAnalytics';
import GoogleTagManager from 'components/googleTagManager';
import Head from 'components/head';
import Header from 'components/header';
import Image from 'components/image/image';
import Menu from 'components/menu';
import MenuItem from 'components/menuItem';
import NotConfigured from 'components/notConfigured';
import Parsely from 'components/parsely';
import Placeholder from 'components/placeholder';
import RawHTML from 'components/rawHTML';
import SocialItem from 'components/socialItem';
import SocialList from 'components/socialList';
import StatsWidget from 'components/statsWidget';
import UserGreeting from 'components/userGreeting';
import withLoader from 'components/hoc/withLoader';
import MegaMenu from 'components/megaMenu';
import SearchBar from 'components/searchBar';

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
  'mittr-plugin-extension/content-list': ContentList,
  'mittr-plugin-extension/content-list-item': ContentListItem,
  disqus: Disqus,
  embed: RawHTML,
  footer: Footer,
  'google-analytics': GoogleAnalytics,
  'google-tag-manager': GoogleTagManager,
  head: Head,
  header: Header,
  html: RawHTML,
  image: Image,
  'mega-menu': MegaMenu,
  menu: Menu,
  'menu-item': MenuItem,
  'mittr/stats-widget': StatsWidget,
  parsely: Parsely,
  'search-bar': SearchBar,
  'social-links': SocialList,
  'social-sharing': SocialList,
  'social-item': SocialItem,
  'user-greeting': UserGreeting,
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
