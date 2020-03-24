import React from 'react';
import PropTypes from 'prop-types';
import RawHTML from 'components/rawHTML';
import classNames from 'classnames';
import { withStyles } from 'critical-style-loader/lib';
import Link from 'components/helpers/link';
import Arrow from 'assets/icons/longArrow.svg';
import styles from './list50Flyout.css';

const CompanyFlyout = (props) => {
  const {
    companyName,
    descriptionTitle,
    description,
    detailsText,
    isVisible,
    statTitle,
    statDescription,
  } = props;

  const detailsUrl = `${window.location.pathname}intro#${companyName}`;

  return (
    <div
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
          <RawHTML content={description} />
        </p>
      </div>
      <div className={styles.stat}>
        <p className={styles.statTitle}>
          {statTitle}:
        </p>
        <p className={styles.statDescription}>
          <RawHTML content={statDescription} />
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
  companyName: PropTypes.string.isRequired,
  descriptionTitle: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  detailsText: PropTypes.string.isRequired,
  isVisible: PropTypes.bool.isRequired,
  statTitle: PropTypes.string.isRequired,
  statDescription: PropTypes.string.isRequired,
};

export default withStyles(styles)(CompanyFlyout);
