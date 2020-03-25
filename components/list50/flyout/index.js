/* eslint-disable react/no-danger */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from 'critical-style-loader/lib';
import addTrailingSlash from 'utils/addTrailingSlash';
import Link from 'components/helpers/link';
import Arrow from 'assets/icons/longArrow.svg';
import styles from './list50Flyout.css';

const CompanyFlyout = (props) => {
  const {
    bgColor,
    companyName,
    descriptionTitle,
    description,
    detailsText,
    isVisible,
    statTitle,
    statDescription,
  } = props;

  const [pathname, setPathname] = useState('');

  useEffect(() => {
    setPathname(window.location.pathname);
  }, []);

  const detailsUrl = `${addTrailingSlash(pathname)}intro#${companyName}`;

  return (
    <div
      style={{ backgroundColor: bgColor }}
      className={classNames(
        styles.wrapper,
        { [styles.isVisible]: isVisible }
      )}
    >
      <div className={styles.description}>
        <p className={styles.descriptionTitle}>
          {descriptionTitle}
        </p>
        <p className={styles.description}>
          {description}
        </p>
      </div>
      <div className={styles.stat}>
        <p className={styles.statTitle}>
          {statTitle}:
        </p>
        <p className={styles.statDescription}>
          {statDescription}
        </p>
      </div>
      <Link className={styles.detailsLink} to={detailsUrl}>
        {detailsText}
        <Arrow />
      </Link>
    </div>
  );
};

CompanyFlyout.propTypes = {
  bgColor: PropTypes.string.isRequired,
  companyName: PropTypes.string.isRequired,
  descriptionTitle: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  detailsText: PropTypes.string.isRequired,
  isVisible: PropTypes.bool.isRequired,
  statTitle: PropTypes.string.isRequired,
  statDescription: PropTypes.string.isRequired,
};

export default withStyles(styles)(CompanyFlyout);
