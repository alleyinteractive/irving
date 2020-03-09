/**
 * We disable the linter rule react/jsx-no-target-blank
 * rule in this file because the desired behavior for social
 * links is that they are opened with a referer. We instead
 * pass rel="noopener" to the social link so that the social
 * page will not run in the same process as our parent page.
 */

/* eslint-disable react/jsx-no-target-blank */

import React from 'react';
import { __ } from '@wordpress/i18n';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import classNames from 'classnames';
import withThemes from 'components/hoc/withThemes';
import CopyLink from 'components/copyLink';
import socialIconMap from './iconMap';
import styles from './socialItem.css';
import lightIconStyles from './lightIcon.css';
import darkIconStyles from './darkIcons.css';
import flyoutIconStyles from './socialItem--flyoutIcon.css';

const SocialItem = (props) => {
  const {
    type,
    url,
    sharePermalink,
    displayIcon,
    theme,
    themeName,
  } = props;
  const IconComponent = socialIconMap[type];
  return (
    <li className={classNames(theme.wrapper, theme[type])}>
      {'link' !== type ? (
        <a
          href={url}
          className={classNames(theme.anchor, 'mittr-share-link')}
          onClick={(e) => {
            e.preventDefault();
            if ('email' === type ||
            'dark' === themeName ||
            'light' === themeName) {
              window.open(
                url,
              );
            } else {
              window.open(
                url,
                'socialWindow',
                'width=325,height=400'
              );
            }
          }}
          target="_blank"
          rel="noopener"
          data-event-category="share-button"
          data-event-action={`in-feed-story-footer-${type}`}
          data-event-label={sharePermalink}
        >
          <span className={theme.screenReaderLabel}>
            {type}{__('link opens in a new window', 'mittr')}
          </span>
          {displayIcon && IconComponent && (
            <div className={theme.icon}>
              <IconComponent />
            </div>
          )}
        </a>
      ) : (
        <CopyLink url={url} themeName={themeName} />
      )}
    </li>
  );
};

SocialItem.propTypes = {
  /**
   * What type of service is this? Should correspond to a key in `socialIconMap`
   */
  type: PropTypes.string.isRequired,
  /**
   * Where should this icon take the user?
   */
  url: PropTypes.string.isRequired,
  /**
   * Should the social icon be displayed, or just text?
   */
  displayIcon: PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
    .isRequired,
  sharePermalink: PropTypes.string.isRequired,
  theme: PropTypes.object.isRequired,
  themeName: PropTypes.string.isRequired,
};

const wrapWithStyles = withStyles(styles, lightIconStyles);

const wrapWithThemes = withThemes('social-item', {
  default: styles,
  light: lightIconStyles,
  flyoutIcon: flyoutIconStyles,
  dark: darkIconStyles,
});

export default wrapWithStyles(wrapWithThemes(SocialItem));
