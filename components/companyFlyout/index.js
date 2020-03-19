/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import Link from 'components/helpers/link';
import styles from './companyFlyout.css';

const CompanyFlyout = (props) => {
  const {
    descriptionTitle,
    description,
    detailsText,
    detailsUrl,
    statTitle,
    statDescription,
  } = props;

  return (
    <div className={styles.wrapper}>
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
          {statTitle}
        </p>
        <p className={styles.statDescription}>
          {statDescription}
        </p>
      </div>
      <Link to={detailsUrl}>{detailsText}</Link>
    </div>
  );
};

CompanyFlyout.propTypes = {
  descriptionTitle: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  detailsText: PropTypes.string.isRequired,
  detailsUrl: PropTypes.string.isRequired,
  statTitle: PropTypes.string.isRequired,
  statDescription: PropTypes.string.isRequired,
};

export default withStyles(styles)(CompanyFlyout);
