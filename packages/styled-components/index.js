import SiteThemeProvider from '@irvingjs/styled/components/SiteThemeProvider';
import App from 'components/app';
import BodyWrapper from 'components/bodyWrapper';
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

import SiteThemeProvider from '../styled/components/site-theme-provider';

export {
  App,
  BodyWrapper,
  Byline,
  Container,
  Fragment,
  Image,
  Link,
  Logo,
  Menu,
  Pagination,
  SearchForm,
  SiteThemeProvider,
  SocialSharing,
  StyledCSSGrid,
  StyledCSSGridCell,
  Text,
};

const ComponentMap = {
  'irving/site-theme': SiteThemeProvider,
  '': Fragment,
  'irving/body-wrapper': BodyWrapper,
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
  'irving/site-theme': SiteThemeProvider,
  'irving/social-sharing': SocialSharing,
  'irving/text': Text,
  'styled-css-grid/cell': StyledCSSGridCell,
  'styled-css-grid/grid': StyledCSSGrid,
  app: App,
};

export default ComponentMap;
