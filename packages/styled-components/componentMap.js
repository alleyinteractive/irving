import SiteThemeProvider from '@irvingjs/styled/components/siteThemeProvider';
import withThemes from '@irvingjs/styled/components/hoc/withThemes';
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
import * as SocialLinks from 'components/socialLinks';
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

// Map the entire export for each component.
export const components = {
  'irving/body-wrapper': BodyWrapper,
  'irving/byline': Byline,
  'irving/container': Container,
  'irving/fragment': Fragment,
  'irving/image': Image,
  'irving/link': Link,
  'irving/logo': Logo,
  'irving/menu': Menu,
  'irving/pagination': Pagination,
  'irving/search-form': SearchForm,
  'irving/social-links': SocialLinks,
  'irving/social-sharing': SocialSharing,
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
  '': Fragment.Component,
  'irving/body-wrapper': BodyWrapper.Component,
  'irving/byline': Byline.Component,
  'irving/container': Container.Component,
  'irving/footer-wrapper': Fragment.Component,
  'irving/fragment': Fragment.Component,
  'irving/head': Head,
  'irving/header-wrapper': Fragment.Component,
  'irving/image': Image.Component,
  'irving/link': Link.Component,
  'irving/logo': Logo.Component,
  'irving/menu': Menu.Component,
  'irving/pagination': Pagination.Component,
  'irving/search-form': SearchForm.Component,
  'irving/site-theme': SiteThemeProvider,
  'irving/social-links': SocialLinks.Component,
  'irving/social-sharing': SocialSharing.Component,
  'irving/text': Text.Component,
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
const createThemedComponentMap = (userThemesToInject) => {
  const componentMapWithThemes = Object.keys(components)
    .reduce((acc, componentName) => {
      const {
        themeMap,
        Component,
      } = components[componentName];

      const userThemes = userThemesToInject[componentName] || {};

      const mergedThemeMap = {
        ...themeMap,
        ...userThemes,
      };

      return {
        ...acc,
        [componentName]: withThemes(mergedThemeMap)(Component),
      };
    }, {});

  return {
    ...defaultMapping,
    ...componentMapWithThemes,
  };
};

export default createThemedComponentMap;
