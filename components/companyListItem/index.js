/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';

import styles from './companyListItem.css';

const CompanyListItem = ({
  rank,
  companyName,
  headquarters,
  industry,
  status,
  yearsOnList,
  valuation,
  summary,
  statTitle,
  statDescription,
}) => (
  <div className={styles.wrapper}>
    <div className={styles.header}>
      <span className={styles.rank}>{rank}</span>
      <h1 className={styles.companyName}>{companyName}</h1>
    </div>
    <ul className={styles.companyStats}>
      {0 < headquarters.length && (
        <li><strong>Headquarters</strong>{' '}{headquarters}</li>
      )}
      {0 < industry.length && (
        <li><strong>Industry</strong>{' '}
          {/* Some industries may contain HTML that need to be escaped. */}
          <div
            className={styles.industry}
            dangerouslySetInnerHTML={{ __html: industry }}
          />
        </li>
      )}
      {0 < status.length && (
        <li><strong>Status</strong>{' '}{status}</li>
      )}
      {0 < yearsOnList.length && (
        <li><strong>Years on the List</strong>{' '}{
          yearsOnList.map((year, key) => {
            if (key !== yearsOnList.length - 1) {
              return <span>{year}{' , '}</span>;
            }

            return <span>{year}</span>;
          })}
        </li>
      )}
      {0 < valuation.length && (
        <li><strong>Valuation</strong>{' '}{valuation}</li>
      )}
    </ul>
    <div className={styles.companyBody}>
      <p><strong>Summary</strong>{' '}{summary}</p>
      {(0 < statTitle.length && 0 < statDescription.length) && (
        <p><strong>{statTitle}</strong>{' '}{statDescription}</p>
      )}
    </div>
  </div>
);

CompanyListItem.propTypes = {
  rank: PropTypes.number.isRequired,
  companyName: PropTypes.string.isRequired,
  headquarters: PropTypes.string.isRequired,
  industry: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  valuation: PropTypes.string.isRequired,
  yearsOnList: PropTypes.arrayOf(PropTypes.number).isRequired,
  summary: PropTypes.string.isRequired,
  statTitle: PropTypes.string.isRequired,
  statDescription: PropTypes.string.isRequired,
};

export default withStyles(styles)(CompanyListItem);
