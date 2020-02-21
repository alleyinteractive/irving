import AdProvider from 'components/advertising/adProvider';
import AdUnit from 'components/advertising/adUnit';
import AccountPage from 'components/accounts/landingPage';
import AccountNavigation from 'components/accounts/accountNavigation';
import AudioElement from 'components/audio';
import AuthorPage from 'components/authorPage';
import Body from 'components/body';
import Brightcove from 'components/brightcove';
import Byline from 'components/byline';
import CardStack from 'components/cardStack';
import Carousel from 'components/carousel';
import Column from 'components/gutenbergContent/blocks/columns/column';
import ColumnArea from 'components/columnArea';
import Columns from 'components/gutenbergContent/blocks/columns';
import CompanyListItem from 'components/companyListItem';
import ConfirmRegistration from 'components/accounts/register/confirm';
import ContentArea from 'components/contentArea';
import ContentBody from 'components/contentBody';
import ContentFooter from 'components/contentFooter';
import ContentHeader from 'components/contentHeader';
import ContentList from 'components/contentList';
import ContentListItem from 'components/contentList/contentListItem';
import Container from 'components/container';
import Disqus from 'components/disqus';
import FeedItem from 'components/feedItem';
import Footer from 'components/footer';
import GoogleAnalytics from 'components/googleAnalytics';
import GoogleTagManager from 'components/googleTagManager';
import GutenbergContent from 'components/gutenbergContent';
import Head from 'components/head';
import Header from 'components/header';
import HeaderWithImage from 'components/headerWithImage';
import HubContent from 'components/hub/content';
import HubList from 'components/hub/list';
import HubContentItem from 'components/hub/contentItem';
import Image from 'components/image/image';
import ImageSet from 'components/imageSet';
import InfiniteItemList from 'components/infiniteItemList';
import Innovator from 'components/innovator';
import InnovatorHeader from 'components/innovatorHeader';
import LinkTeaser from 'components/linkTeaser';
import ListDescription from 'components/listDescription';
import ListGroup from 'components/listGroup';
import ListHeader from 'components/listHeader';
import ListItem from 'components/listItem';
import ListMenu from 'components/listMenu';
import ListMenuItem from 'components/listMenuItem';
import ListMenuItems from 'components/listMenuItems';
import Login from 'components/accounts/login/';
import MagazineStory from 'components/magazineStory';
import MagazineHero from 'components/magazineHero';
import MagazineIssue from 'components/magazineIssue';
import MagazineIssues from 'components/magazineIssues';
import MagazineSidebar from 'components/magazineSidebar';
import MagazineYear from 'components/magazineYear';
import MegaMenu from 'components/megaMenu';
import Menu from 'components/menu';
import MenuItem from 'components/menuItem';
import Newsletter from 'components/newsletter';
import NotConfigured from 'components/notConfigured';
import Order from 'components/accounts/order';
import OrderHistory from 'components/accounts/orderHistory';
import OurTeamModule from 'components/ourTeamModule';
import PageBody from 'components/pageBody';
import Parsely from 'components/parsely';
import Placeholder from 'components/placeholder';
import PodcastArchiveHeader from 'components/podcast/archive/header';
import PodcastContentItem from 'components/podcast/archive/contentItem';
import PodcastList from 'components/podcast/archive/list';
import Popular from 'components/popular';
import PostList from 'components/postList';
import RawHTML from 'components/rawHTML';
import Register from 'components/accounts/register';
import Related from 'components/related';
import Schema from 'components/schema';
import SearchBar from 'components/searchBar';
import SectionItem from 'components/subtopicsSection/sectionItem';
import ShareStories from 'components/shareStories';
import Sidebar from 'components/sidebar';
import SocialItem from 'components/socialItem';
import SocialList from 'components/socialList';
import SocialFollowModule from 'components/socialFollowModule';
import SponsoredModule from 'components/sponsoredModule';
import SponsoredFeedItem from 'components/feedItem/sponsored';
import StatsWidget from 'components/statsWidget';
import StoryGroup from 'components/storyGroup';
import SubtopicsSection from 'components/subtopicsSection';
import Subscriptions from 'components/accounts/subscriptions';
import TagLink from 'components/tagLink';
import Tags from 'components/tags';
import TeamModuleItem from 'components/ourTeamModule/item';
import TeaserItem from 'components/teaserItem';
import TermArchiveContentList from 'components/termArchiveContentList';
import TopicsModule from 'components/topicsModule';
import UserGreeting from 'components/userGreeting';
import Verify from 'components/accounts/verify';
import Video from 'components/video';
import withLoader from 'components/hoc/withLoader';

/**
 * Defines which React component to render for each received API component.
 */
export const componentMap = {
  'ad-provider': AdProvider,
  'ad-unit': AdUnit,
  account: AccountPage,
  'account-navigation': AccountNavigation,
  'admin-bar': Placeholder,
  'audio-element': AudioElement,
  'author-partial': AuthorPage,
  'bc/brightcove': Brightcove,
  body: withLoader(Body),
  byline: Byline,
  'column-area': ColumnArea,
  'confirm-registration': ConfirmRegistration,
  'content-area': ContentArea,
  'content-body': ContentBody,
  'content-footer': ContentFooter,
  'content-header': ContentHeader,
  'content-list-item': ContentListItem,
  container: Container,
  'core/column': Column,
  'core/columns': Columns,
  disqus: Disqus,
  embed: RawHTML,
  'core-embed': RawHTML,
  'feed-anchor': CardStack,
  footer: Footer,
  'google-analytics': GoogleAnalytics,
  'google-tag-manager': GoogleTagManager,
  'gutenberg-content': GutenbergContent,
  head: Head,
  header: Header,
  'header-with-image': HeaderWithImage,
  'hub-content': HubContent,
  'hub-content-list': HubList,
  'hub-content-item': HubContentItem,
  'feed-item': FeedItem,
  html: RawHTML,
  image: Image,
  'infinite-list': InfiniteItemList,
  innovator: Innovator,
  'link-teaser': LinkTeaser,
  'innovator-header': InnovatorHeader,
  'list-header': ListHeader,
  'list-description': ListDescription,
  'list-menu': ListMenu,
  'list-menu-item': ListMenuItem,
  'list-menu-items': ListMenuItems,
  'list-group': ListGroup,
  'list-item': ListItem,
  'list-50-item': CompanyListItem,
  login: Login,
  logo: Image,
  'magazine-card': MagazineYear,
  'magazine-hero': MagazineHero,
  'magazine-issue': MagazineIssue,
  'magazine-issues': MagazineIssues,
  'magazine-module': MagazineSidebar,
  'mega-menu': MegaMenu,
  menu: Menu,
  'menu-item': MenuItem,
  'mittr-plugin-extension/carousel': Carousel,
  'mittr-plugin-extension/content-list': ContentList,
  'mittr-plugin-extension/content-list-item': ContentListItem,
  'mittr-plugin-extension/image-set': ImageSet,
  'mittr-plugin-extension/newsletter': Newsletter,
  'mittr-plugin-extension/post-list': PostList,
  'mittr-plugin-extension/stats-widget': StatsWidget,
  'mittr-plugin-extension/related': Related,
  'mittr-plugin-extension/magazine-story': MagazineStory,
  newsletter: Newsletter,
  order: Order,
  'order-history': OrderHistory,
  'our-team-module': OurTeamModule,
  pagination: Placeholder,
  parsely: Parsely,
  'page-body': PageBody,
  'podcast-archive-header': PodcastArchiveHeader,
  'podcast-content-item': PodcastContentItem,
  'podcast-list': PodcastList,
  popular: Popular,
  'post-list': PostList,
  register: Register,
  schema: Schema,
  'search-bar': SearchBar,
  'section-item': SectionItem,
  'share-stories': ShareStories,
  'subtopics-section': SubtopicsSection,
  subscriptions: Subscriptions,
  sidebar: Sidebar,
  'social-follow-module': SocialFollowModule,
  'social-sharing': SocialList,
  'social-item': SocialItem,
  sponsored: SponsoredFeedItem,
  'sponsored-module': SponsoredModule,
  'story-group': StoryGroup,
  'tag-link': TagLink,
  tags: Tags,
  'team-module-item': TeamModuleItem,
  'teaser-item': TeaserItem,
  'term-archive-content-list': TermArchiveContentList,
  'term-archive-content-list-item': TeaserItem,
  'technology-meta': ContentList,
  'topic-header': CardStack,
  'topics-module': TopicsModule,
  'user-greeting': UserGreeting,
  verify: Verify,
  video: Video,
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
