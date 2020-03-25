import AdProvider from 'components/advertising/adProvider';
import AdUnit from 'components/advertising/adUnit';
import AccountPage from 'components/accounts/landingPage';
import AccountNavigation from 'components/accounts/accountNavigation';
import Activate from 'components/accounts/register/activate';
import AudioElement from 'components/audio';
import AuthorPage from 'components/authorPage';
import Blueconic from 'components/blueconic';
import Body from 'components/body';
import Brightcove from 'components/brightcove';
import Byline from 'components/byline';
import CardStack from 'components/cardStack';
import Carousel from 'components/carousel';
import Column from 'components/gutenbergContent/blocks/columns/column';
import ColumnArea from 'components/columnArea';
import Columns from 'components/gutenbergContent/blocks/columns';
import CompanyListItem from 'components/companyListItem';
import CompleteProfile from 'components/accounts/register/completeProfile';
import ConfirmRegistration from 'components/accounts/register/confirm';
import ContactForm from 'components/contactForm';
import ContentArea from 'components/contentArea';
import ContentBody from 'components/contentBody';
import ContentFooter from 'components/contentFooter';
import ContentHeader from 'components/contentHeader';
import ContentList from 'components/contentList';
import ContentListItem from 'components/contentList/contentListItem';
import Container from 'components/container';
import Disqus from 'components/disqus';
import Error404 from 'components/error404';
import EventsPromoModule from 'components/eventsPromoModule';
import FeedItem from 'components/feedItem';
import Footer from 'components/footer';
import GoogleAnalytics from 'components/googleAnalytics';
import GoogleTagManager from 'components/googleTagManager';
import GutenbergContent from 'components/gutenbergContent';
import Head from 'components/head';
import Header from 'components/header';
import Heading from 'components/helpers/heading';
import HeaderWithImage from 'components/headerWithImage';
import HubContent from 'components/hub/content';
import HubList from 'components/hub/list';
import HubContentItem from 'components/hub/contentItem';
import Image from 'components/image/image';
import ImageSet from 'components/imageSet';
import InfiniteItemList from 'components/infiniteItemList';
import Innovator from 'components/innovator';
import InnovatorHeader from 'components/innovatorHeader';
import Link from 'components/helpers/link';
import LinkTeaser from 'components/linkTeaser';
import List50View from 'components/list50/view';
import List50Heading from 'components/list50/heading';
import List50Header from 'components/list50/header';
import List50Content from 'components/list50/content';
import List50Item from 'components/list50/item';
import List50Flyout from 'components/list50/flyout';
import List50Sidebar from 'components/list50/sidebar';
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
import Placeholder from 'components/placeholder';
import PodcastArchiveHeader from 'components/podcast/archive/header';
import PodcastContentItem from 'components/podcast/archive/contentItem';
import PodcastList from 'components/podcast/archive/list';
import Popular from 'components/popular';
import PostList from 'components/postList';
import RawHTML from 'components/rawHTML';
import Register from 'components/accounts/register';
import Related from 'components/related';
import ResetRequestForm from 'components/accounts/resetPassword/request';
import ConfirmResetRequest from 'components/accounts/resetPassword/requestConfirmation'; // eslint-disable-line max-len
import ResetPasswordForm from 'components/accounts/resetPassword/reset';
import ConfirmReset from 'components/accounts/resetPassword/resetConfirmation';
import Schema from 'components/schema';
import SearchBar from 'components/searchBar';
import SectionItem from 'components/subtopicsSection/sectionItem';
import ShareStories from 'components/shareStories';
import Sidebar from 'components/sidebar';
import SliderAd from 'components/advertising/slider';
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
import UpdateEmailRequest from 'components/accounts/updateEmail/request';
import UpdateEmailConfirm from 'components/accounts/updateEmail/confirmation';
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
  activate: Activate,
  'admin-bar': Placeholder,
  'audio-element': AudioElement,
  'author-partial': AuthorPage,
  'bc/brightcove': Brightcove,
  blueconic: Blueconic,
  body: withLoader(Body),
  byline: Byline,
  'column-area': ColumnArea,
  'complete-profile': CompleteProfile,
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
  'error-404': Error404,
  'events-promo-module': EventsPromoModule,
  'core-embed': RawHTML,
  'feed-anchor': CardStack,
  footer: Footer,
  'google-analytics': GoogleAnalytics,
  'google-tag-manager': GoogleTagManager,
  'gutenberg-content': GutenbergContent,
  head: Head,
  header: Header,
  heading: Heading,
  'header-with-image': HeaderWithImage,
  'hub-content': HubContent,
  'hub-content-list': HubList,
  'hub-content-item': HubContentItem,
  'feed-item': FeedItem,
  html: RawHTML,
  image: Image,
  'infinite-list': InfiniteItemList,
  innovator: Innovator,
  'link-to': Link,
  'link-teaser': LinkTeaser,
  'innovator-header': InnovatorHeader,
  'list-header': ListHeader,
  'list-description': ListDescription,
  'list-menu': ListMenu,
  'list-menu-item': ListMenuItem,
  'list-menu-items': ListMenuItems,
  'list-group': ListGroup,
  'list-item': ListItem,
  'list-50-content': List50Content,
  'list-50-heading': List50Heading,
  'list-50-header': List50Header,
  'list-50-sidebar': List50Sidebar,
  'list-50-intro-item': CompanyListItem,
  'list-50-location': List50View,
  'list-50-location-item': List50Item,
  'list-50-rank': List50View,
  'list-50-rank-item': List50Item,
  'list-50-years': List50View,
  'list-50-years-item': List50Item,
  'list-50-name': List50View,
  'list-50-name-item': List50Item,
  'list-50-item-flyout': List50Flyout,
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
  'mittr-plugin-extension/contact-form': ContactForm,
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
  'page-body': PageBody,
  'podcast-archive-header': PodcastArchiveHeader,
  'podcast-content-item': PodcastContentItem,
  'podcast-list': PodcastList,
  popular: Popular,
  'post-list': PostList,
  register: Register,
  'reset-password-request': ResetRequestForm,
  'reset-password-request-confirmation': ConfirmResetRequest,
  'reset-password': ResetPasswordForm,
  'reset-password-confirmation': ConfirmReset,
  schema: Schema,
  'search-bar': SearchBar,
  'section-item': SectionItem,
  'share-stories': ShareStories,
  'subtopics-section': SubtopicsSection,
  subscriptions: Subscriptions,
  sidebar: Sidebar,
  'slider-ad': SliderAd,
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
  'update-email-request': UpdateEmailRequest,
  'update-email-confirmation': UpdateEmailConfirm,
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
