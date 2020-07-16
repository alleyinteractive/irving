import SiteThemeProvider from '@irvingjs/styled/components/siteThemeProvider';
import createWithUserThemes
  from '@irvingjs/styled/components/hoc/createWithUserThemes';

import App from 'components/app';
import Head from 'components/head';
import * as BodyWrapper from 'components/bodyWrapper';
import * as Byline from 'components/byline';
import * as Container from 'components/container';
import * as Fragment from 'components/fragment';
import * as Image from 'components/image';
import * as Link from 'components/link';
import * as Logo from 'components/logo';
import * as Menu from 'components/menu';
import * as Pagination from 'components/pagination';
import * as SearchForm from 'components/searchForm';
import * as SocialSharing from 'components/socialSharing';
import * as Text from 'components/text';

// Default icons.
import {
  GrFacebook as FacebookIcon,
  GrLinkedin as LinkedinIcon,
  GrMail as EmailIcon,
  GrPinterest as PinterestIcon,
  GrReddit as RedditIcon,
  GrSearch as SearchIcon,
  GrTwitter as TwitterIcon,
} from 'react-icons/gr';

import {
  IoLogoWhatsapp as WhatsappIcon,
} from 'react-icons/io';

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
  'irving/fragment': Fragment,
  'irving/image': Image,
  'irving/link': Link,
  'irving/logo': Logo,
  'irving/menu': Menu,
  'irving/pagination': Pagination,
  'irving/searchForm': SearchForm,
  'irving/socialSharing': SocialSharing,
  'irving/text': Text,
};

export const defaultIcons = {
  'irving/email-icon': EmailIcon,
  'irving/facebook-icon': FacebookIcon,
  'irving/linkedin-icon': LinkedinIcon,
  'irving/pinterest-icon': PinterestIcon,
  'irving/reddit-icon': RedditIcon,
  'irving/search-icon': SearchIcon,
  'irving/twitter-icon': TwitterIcon,
  'irving/whatsapp-icon': WhatsappIcon,
};

// Map the default styled components.
export const defaultMapping = {
  ...defaultIcons,
  '': Fragment.StyledComponent,
  'irving/body-wrapper': BodyWrapper.StyledComponent,
  'irving/byline': Byline.StyledComponent,
  'irving/container': Container.StyledComponent,
  'irving/footer-wrapper': Fragment.StyledComponent,
  'irving/fragment': Fragment.StyledComponent,
  'irving/head': Head,
  'irving/header-wrapper': Fragment.StyledComponent,
  'irving/image': Image.StyledComponent,
  'irving/link': Link.StyledComponent,
  'irving/logo': Logo.StyledComponent,
  'irving/menu': Menu.StyledComponent,
  'irving/pagination': Pagination.StyledComponent,
  'irving/search-form': SearchForm.StyledComponent,
  'irving/site-theme': SiteThemeProvider,
  'irving/social-sharing': SocialSharing.StyledComponent,
  'irving/text': Text.StyledComponent,
  'styled-css-grid/cell': StyledCSSGridCell,
  'styled-css-grid/grid': StyledCSSGrid,
  app: App,
  head: Head,
};

/**
 * Build a mapping of component names to React components. Inject any
 * user-defined themes into the component's default themeMap.
 *
 * @param {object} userThemesToInject A theme map.
 * @return {object}
 */
const ComponentMap = (userThemesToInject) => {
  // Loop through the `userThemesToInject`` object
  const userMapping = Object.keys(userThemesToInject)
    .reduce((acc, componentName) => ({
      ...acc,
      [componentName]: createWithUserThemes(
        components[componentName].PureComponent, // Use the pure component.
        components[componentName].themeMap.default // And the default theme.
      )({
        ...components[componentName].themeMap, // Include all default themes.
        ...userThemesToInject[componentName], // And merge/override with custom user themes.
      }),
    }), {});

  return {
    ...defaultMapping,
    ...userMapping,
  };
};

export default ComponentMap;
