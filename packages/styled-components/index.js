import App from 'components/app';
import Byline from 'components/byline';
import Container from 'components/container';
import Fragment from 'components/fragment';
import HTML from 'components/html';
import Link from 'components/link';
import Logo from 'components/logo';
import Menu from 'components/menu';
import { Helmet } from 'react-helmet';

export {
  '': Fragment,
  'irving/body-wrapper': Fragment,
  'irving/container': Container,
  'irving/footer-wrapper': Fragment,
  'irving/fragment': Fragment,
  'irving/header-wrapper': Fragment,
  'irving/helmet': Helmet,
  'irving/html': HTML,
  'irving/link': Link,
  'irving/logo': Logo,
  'irving/menu': Menu,
  'irving/post-byline': Byline,
  app: App,
}
