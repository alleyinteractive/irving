import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import classNames from 'classnames';
import Link from 'components/helpers/link';
import socialIconMap from './iconMap';
import styles from './socialItem.css';

const SocialItem = ({ type, url, displayIcon }) => {
  const IconComponent = socialIconMap[type];

  return (
    <li className={classNames(styles.wrapper, styles[type])}>
      <Link to={url} className={styles.anchor}>
        <span
          className={
            classNames({
              [styles.label]: 'link' === type,
              [styles.screenReaderLabel]: 'link' !== type,
            })
          }
        >
          {type}
        </span>
        {displayIcon && IconComponent && (
          <div className={styles.icon}>
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
};

const wrapWithStyles = withStyles(styles);

export default wrapWithStyles(SocialItem);
