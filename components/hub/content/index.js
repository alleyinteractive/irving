import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import { findChildByName } from 'utils/children';
import Link from 'components/helpers/link';
// Styles
import styles from './hubContent.css';

const HubContent = ({
  children,
  title,
  sponsorName,
  sponsorUrl,
}) => {
  const content = findChildByName('html', children);
  const sponsorLogo = findChildByName('image', children);

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.titleLogo}>
          <h1 className={styles.title}>{title}</h1>
          <Link
            to={sponsorUrl}
            className={styles.sponsorLogo}
          >
            <span className={styles.sponsorName}>{sponsorName}</span>
            {sponsorLogo}
          </Link>
        </div>
        <div className={styles.description}>{content}</div>
      </div>

    </div>
  );
};

HubContent.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  sponsorName: PropTypes.string.isRequired,
  sponsorUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default withStyles(styles)(HubContent);
