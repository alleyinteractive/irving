/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import withThemes from 'component-candidates/hoc/withThemes';
import * as defaultStyles from './themes/default';

/**
 * Display the site name or logo.
 */
const Logo = (props) => {
  const {
    siteName,
    logo,
    logoUrl,
    theme,
  } = props;

  const { Wrapper, Link } = theme;

  // @todo can we do this better?
  const component = logo ?
    <Logo /> :
    logoUrl ?
      <img src={logoUrl} alt={siteName} /> :
        <h2>{siteName}</h2>;

  // @todo use a real <Link> component rather than an styled anchor.
  return (
    <Wrapper>
      <Link href="/">{component}</Link>
    </Wrapper>
  );
};

Logo.defaultProps = {
  logo: null,
  logoUrl: '',
  siteName: '',
  theme: 'default',
};

Logo.propTypes = {
  /**
   * Logo component to override the image.
   */
  logo: PropTypes.element,
  /**
   * URL of the image.
   */
  logoUrl: PropTypes.string,
  /**
   * Site name.
   */
  siteName: PropTypes.string,
  /**
   * Theme (styles) to apply to the component.
   */
  theme: PropTypes.object.isRequired,
};

const themeMap = {
  default: defaultStyles,
};

export default withThemes(themeMap)(Logo);
