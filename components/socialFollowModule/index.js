import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import withThemes from 'components/hoc/withThemes';
import { withStyles } from 'critical-style-loader/lib';
import { __ } from '@wordpress/i18n';
import classNames from 'classnames';
// Styles
import styles from './socialFollowModule.css';
import darkStyles from './darkTitle.css';
import lightStyles from './lightTitle.css';

const SocialFollowModule = ({ children, theme, context }) => {
  const [socialToRender, setSocialToRender] = useState(true);
  useEffect(() => {
    const windowSizeChanged = () => setSocialToRender(
      (700 <= window.innerHeight)
    );
    windowSizeChanged();
    window.addEventListener('resize', windowSizeChanged);
  }, []);
  const socialModule = (
    <div className={classNames(theme.wrapper, {
      [theme.megaMenuTheme]: 'mega-menu' === context,
    })}
    >
      {socialToRender}
      <span className={theme.title}>
        {__('Follow', 'mittr')}
      </span>
      <ul className={styles.social}>
        { children }
      </ul>
    </div>
  );
  return socialToRender ? socialModule : null;
};

SocialFollowModule.defaultProps = {
  context: '',
};

SocialFollowModule.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  theme: PropTypes.object.isRequired,
  context: PropTypes.string,
};

const wrapWithStyles = withStyles(
  styles,
  darkStyles,
  lightStyles,
);

const wrapWithThemes = withThemes('social-follow-module', {
  default: styles,
  dark: darkStyles,
  light: lightStyles,
});

export default wrapWithStyles(wrapWithThemes(SocialFollowModule));
