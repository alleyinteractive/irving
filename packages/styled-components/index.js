import App from 'components/app';
import Byline from 'components/byline';
import Container from 'components/container';
import Fragment from 'components/fragment';
import Image from 'components/image';
import Link from 'components/link';
import Logo from 'components/logo';
import Menu from 'components/menu';
import Pagination from 'components/pagination';
import SearchForm from 'components/searchForm';
import SocialSharing from 'components/socialSharing';
import Text from 'components/text';

/**
 * Include support for using the `styled-css-grid` package.
 *
 * @see https://github.com/azz/styled-css-grid
 */
import {
  Grid as StyledCSSGrid,
  Cell as StyledCSSGridCell,
} from 'styled-css-grid';

export {
  App,
  Byline,
  Container,
  Fragment,
  Image,
  Link,
  Logo,
  Menu,
  Pagination,
  SearchForm,
  SocialSharing,
  StyledCSSGrid,
  StyledCSSGridCell,
  Text,
};

const ComponentMap = {
  '': Fragment,
  'irving/body-wrapper': Fragment,
  'irving/byline': Byline,
  'irving/container': Container,
  'irving/footer-wrapper': Fragment,
  'irving/fragment': Fragment,
  'irving/header-wrapper': Fragment,
  'irving/image': Image,
  'irving/link': Link,
  'irving/logo': Logo,
  'irving/menu': Menu,
  'irving/pagination': Pagination,
  'irving/search-form': SearchForm,
  'irving/social-sharing': SocialSharing,
  'irving/text': Text,
  'styled-css-grid/cell': StyledCSSGridCell,
  'styled-css-grid/grid': StyledCSSGrid,
  app: App,
};

export default ComponentMap;
