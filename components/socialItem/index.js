import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import classNames from 'classnames';
import withThemes from 'components/hoc/withThemes';
import Link from 'components/helpers/link';
import socialIconMap from './iconMap';
import styles from './socialItem.css';
import whiteIconStyles from './whiteIcon.css';

const SocialItem = ({
  type, url, displayIcon, theme,
}) => {
  const IconComponent = socialIconMap[type];

  return (
    <li className={classNames(theme.wrapper, theme[type])}>
      <Link to={url} className={theme.anchor}>
        <span
          className={
            classNames({
              [theme.label]: 'link' === type,
              [theme.screenReaderLabel]: 'link' !== type,
            })
          }
        >
          {type}
        </span>
        {displayIcon && IconComponent && (
          <div className={theme.icon}>
            <IconComponent />
          </div>
        )}
      </Link>
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
  'white-icon': whiteIconStyles,
});

export default wrapWithStyles(wrapWithThemes(SocialItem));
