import AudioElement from 'components/audio';
import AuthorPage from 'components/authorPage';
import Body from 'components/body';
import Byline from 'components/byline';
import Column from 'components/gutenbergContent/blocks/columns/column';
import ColumnArea from 'components/columnArea';
import Columns from 'components/gutenbergContent/blocks/columns';
import ContentBody from 'components/contentBody';
import ContentFooter from 'components/contentFooter';
import ContentHeader from 'components/contentHeader';
import ContentList from 'components/contentList';
import ContentListItem from 'components/contentList/contentListItem';
import Disqus from 'components/disqus';
import Footer from 'components/footer';
import GoogleAnalytics from 'components/googleAnalytics';
import GoogleTagManager from 'components/googleTagManager';
import GutenbergContent from 'components/gutenbergContent';
import Head from 'components/head';
import Header from 'components/header';
import HeaderWithImage from 'components/headerWithImage';
import FeedItem from 'components/feedItem';
import Image from 'components/image/image';
import Innovator from 'components/innovator';
import InnovatorHeader from 'components/innovatorHeader';
import ListHeader from 'components/listHeader';
import ListDescription from 'components/listDescription';
import ListMenu from 'components/listMenu';
import ListMenuItem from 'components/listMenuItem';
import ListMenuItems from 'components/listMenuItems';
import ListGroup from 'components/listGroup';
import ListItem from 'components/listItem';
import MagazineHero from 'components/magazineHero';
import MagazineIssue from 'components/magazineIssue';
import MagazineIssues from 'components/magazineIssues';
import MegaMenu from 'components/megaMenu';
import Menu from 'components/menu';
import MenuItem from 'components/menuItem';
import NotConfigured from 'components/notConfigured';
import PageBody from 'components/pageBody';
import Parsely from 'components/parsely';
import Placeholder from 'components/placeholder';
import PostList from 'components/postList';
import RawHTML from 'components/rawHTML';
import SearchBar from 'components/searchBar';
import SectionItem from 'components/subtopicsSection/sectionItem';
import Sidebar from 'components/sidebar';
import SubtopicsSection from 'components/subtopicsSection';
import SocialItem from 'components/socialItem';
import SocialList from 'components/socialList';
import StatsWidget from 'components/statsWidget';
import TagLink from 'components/tagLink';
import Tags from 'components/tags';
import TeaserItem from 'components/teaserItem';
import TermArchiveContentList from 'components/termArchiveContentList';
import TermArchivePinnedArticle from 'components/termArchivePinnedArticle';
import TopicHeader from 'components/topicHeader';
import UserGreeting from 'components/userGreeting';
import withLoader from 'components/hoc/withLoader';

/**
 * Defines which React component to render for each received API component.
 */
export const componentMap = {
  'admin-bar': Placeholder,
  'audio-element': AudioElement,
  'author-partial': AuthorPage,
  body: withLoader(Body),
  byline: Byline,
  'column-area': ColumnArea,
  'content-body': ContentBody,
  'content-footer': ContentFooter,
  'content-header': ContentHeader,
  'content-list-item': ContentListItem,
  'core/column': Column,
  'core/columns': Columns,
  disqus: Disqus,
  embed: RawHTML,
  footer: Footer,
  'google-analytics': GoogleAnalytics,
  'google-tag-manager': GoogleTagManager,
  'gutenberg-content': GutenbergContent,
  head: Head,
  header: Header,
  'header-with-image': HeaderWithImage,
  'feed-item': FeedItem,
  html: RawHTML,
  image: Image,
  innovator: Innovator,
  'innovator-header': InnovatorHeader,
  'list-header': ListHeader,
  'list-description': ListDescription,
  'list-menu': ListMenu,
  'list-menu-item': ListMenuItem,
  'list-menu-items': ListMenuItems,
  'list-group': ListGroup,
  'list-item': ListItem,
  logo: Image,
  'magazine-hero': MagazineHero,
  'magazine-issue': MagazineIssue,
  'magazine-issues': MagazineIssues,
  'mega-menu': MegaMenu,
  menu: Menu,
  'menu-item': MenuItem,
  'mittr-plugin-extension/content-list': ContentList,
  'mittr-plugin-extension/content-list-item': ContentListItem,
  'mittr-plugin-extension/stats-widget': StatsWidget,
  pagination: Placeholder,
  parsely: Parsely,
  'page-body': PageBody,
  'post-list': PostList,
  'search-bar': SearchBar,
  'section-item': SectionItem,
  'subtopics-section': SubtopicsSection,
  sidebar: Sidebar,
  'social-links': SocialList,
  'social-sharing': SocialList,
  'social-item': SocialItem,
  'tag-link': TagLink,
  tags: Tags,
  'teaser-item': TeaserItem,
  'term-archive-content-list': TermArchiveContentList,
  'term-archive-content-list-item': TeaserItem,
  'term-archive-pinned-article': TermArchivePinnedArticle,
  'technology-meta': ContentList,
  'topic-header': TopicHeader,
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
