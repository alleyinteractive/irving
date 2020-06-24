import App from 'components/app';
import Byline from 'components/byline';
import Container from 'components/container';
import Fragment from 'components/fragment';
import Link from 'components/link';
import Logo from 'components/logo';
import Menu from 'components/menu';
import Pagination from 'components/pagination';
import SearchForm from 'components/searchForm';
import SocialSharing from 'components/socialSharing';
import Text from 'components/text';

/**
 * Include support for using the `hedron` flexbox grid package.
 *
 * @see https://github.com/garetmckinley/hedron
 */
import HedronGrid from 'hedron'

export {
  App,
  Byline,
  Container,
  Fragment,
  Link,
  Logo,
  Menu,
  Pagination,
  SearchForm,
  SocialSharing,
  Text,
};

const ComponentMap = {
  '': Fragment,
  'hedron/grid-bounds': HedronGrid.Bounds,
  'hedron/grid-box': HedronGrid.Box,
  'hedron/grid-provider': HedronGrid.Provider,
  'irving/body-wrapper': Fragment,
  'irving/byline': Byline,
  'irving/container': Container,
  'irving/footer-wrapper': Fragment,
  'irving/fragment': Fragment,
  'irving/header-wrapper': Fragment,
  'irving/link': Link,
  'irving/logo': Logo,
  'irving/menu': Menu,
  'irving/pagination': Pagination,
  'irving/search-form': SearchForm,
  'irving/social-sharing': SocialSharing,
  'irving/text': Text,
  app: App,
};

export default ComponentMap;
