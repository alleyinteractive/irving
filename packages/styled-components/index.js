import App from 'components/app';
import Byline from 'components/byline';
import Container from 'components/container';
import Fragment from 'components/fragment';
import HTML from 'components/html';
import Link from 'components/link';
import Logo from 'components/logo';
import Menu from 'components/menu';
import SocialSharing from 'components/socialSharing';

export {
  App,
  Byline,
  Container,
  Fragment,
  HTML,
  Link,
  Logo,
  Menu,
  SocialSharing,
};

const ComponentMap = {
  '': Fragment,
  'irving/body-wrapper': Fragment,
  'irving/byline': Byline,
  'irving/container': Container,
  'irving/footer-wrapper': Fragment,
  'irving/fragment': Fragment,
  'irving/header-wrapper': Fragment,
  'irving/html': HTML,
  'irving/link': Link,
  'irving/logo': Logo,
  'irving/menu': Menu,
  'irving/social-sharing': SocialSharing,
  'irving/text': Fragment,
  app: App,
};

export default ComponentMap;
