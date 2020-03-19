/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import styles from './companyFlyout.css';

const CompanyFlyout = (props) => {
  const {
    descriptionTitle,
    description,
    statTitle,
    statDescription,
  } = props;

  return (
    <div className={styles.wrapper}>
      {descriptionTitle}
      {description}
      {statTitle}
      {statDescription}
    </div>
  );
};

CompanyFlyout.propTypes = {
  descriptionTitle: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  statTitle: PropTypes.string.isRequired,
  statDescription: PropTypes.string.isRequired,
};

export default withStyles(styles)(CompanyFlyout);
