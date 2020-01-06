/**
 * We disable the linter rule react/jsx-no-target-blank
 * rule in this file because the desired behavior for social
 * links is that they are opened with a referer. We instead
 * pass rel="noopener" to the social link so that the social
 * page will not run in the same process as our parent page.
 */

/* eslint-disable react/jsx-no-target-blank */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import classNames from 'classnames';
import withThemes from 'components/hoc/withThemes';
import CopyLink from 'components/copyLink';
import socialIconMap from './iconMap';
import styles from './socialItem.css';
import whiteIconStyles from './whiteIcon.css';

const SocialItem = ({
  type, url, displayIcon, theme,
}) => {
  const IconComponent = socialIconMap[type];
  return (
    <li className={classNames(theme.wrapper, theme[type])}>
      {'link' !== type ? (
        <a
          href={url}
          className={theme.anchor}
          onClick={(e) => {
            e.preventDefault();
            window.open(
              url,
              'socialWindow',
              'width=325,height=400'
            );
          }}
          target="_blank"
          rel="noopener"
        >
          <span className={theme.screenReaderLabel}>
            {type}
          </span>
          {displayIcon && IconComponent && (
            <div className={theme.icon}>
              <IconComponent />
            </div>
          )}
        </a>
      ) : (
        <CopyLink url={url} />
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
  theme: PropTypes.object.isRequired,
};

const wrapWithStyles = withStyles(styles, whiteIconStyles);

const wrapWithThemes = withThemes('social-item', {
  default: styles,
  whiteIcon: whiteIconStyles,
});

export default wrapWithStyles(wrapWithThemes(SocialItem));
