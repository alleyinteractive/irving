import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import classNames from 'classnames';
import withThemes from 'components/hoc/withThemes';
import { __ } from '@wordpress/i18n';
import styles from './socialList.css';
import trListStyles from './trList.css';
import flyoutStyles from './socialList--flyout.css';
import siteHeaderStyles from './socialList--siteHeader.css';

const SocialList = (props) => {
  const { children: links, theme, themeName } = props;

  const filteredLinks = links.filter((link) => 'link' !== link.props.type);
  const copyLink = links.filter((link) => 'link' === link.props.type)[0];

  return (
    <div className={classNames(theme.wrapper, {})}>
      <div className={theme.shareWrapper}>
        <h3 className={theme.title}>
          {__('Share', 'mittr')}
        </h3>
        <ul className={theme.list}>
          {'flyout' !== themeName ? links : filteredLinks}
        </ul>
      </div>
      {'flyout' === themeName && (
        <div className={theme.copyWrapper}>
          {copyLink}
        </div>
      )}
    </div>
  );
};

SocialList.propTypes = {
  /**
   * Component children, usually a list of `<SocialItem />` components
   */
  children: PropTypes.node.isRequired,
  theme: PropTypes.object.isRequired,
  themeName: PropTypes.string.isRequired,
};

const wrapWithStyles = withStyles(styles, trListStyles);

const wrapWithThemes = withThemes('social-list', {
  default: styles,
  flyout: flyoutStyles,
  listHeader: trListStyles,
  siteHeader: siteHeaderStyles,
});

export default wrapWithStyles(wrapWithThemes(SocialList));
