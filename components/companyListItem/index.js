/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import { __ } from '@wordpress/i18n';
import { withStyles } from 'critical-style-loader/lib';
import Link from 'components/helpers/link';
import toReactElement from 'utils/toReactElement';

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
  relatedStories,
}) => (
  <div className={styles.wrapper} id={companyName}>
    <div className={styles.header}>
      <span className={styles.rank}>{rank}</span>
      <h1 className={styles.companyName}>{companyName}</h1>
    </div>
    <ul className={styles.companyStats}>
      {0 < headquarters.length && (
        <li>
          <strong>{__('Headquarters', 'mittr')}</strong>
          {' '}{headquarters}
        </li>
      )}
      {0 < industry.length && (
        <li>
          <strong>{__('Industry', 'mittr')}</strong>
          {' '}
          {/* Some industries may contain HTML that need to be escaped. */}
          <div
            className={styles.industry}
            dangerouslySetInnerHTML={{ __html: industry }}
          />
        </li>
      )}
      {0 < status.length && (
        <li>
          <strong>{__('Status', 'mittr')}</strong>
          {' '}{status}
        </li>
      )}
      {0 < yearsOnList.length && (
        <li>
          <strong>{__('Years on the List', 'mittr')}</strong>
          {' '}{
            yearsOnList.map((year, key) => {
              if (key !== yearsOnList.length - 1) {
                return <span>{year}{' , '}</span>;
              }

              return <span>{year}</span>;
            })}
        </li>
      )}
      {0 < valuation.length && (
        <li>
          <strong>{__('Valuation', 'mittr')}</strong>
          {' '}{valuation}
        </li>
      )}
    </ul>

    <div className={styles.companyBody}>
      <p>
        <strong>{__('Summary', 'mittr')}</strong>
        {' '}{summary}
      </p>
      {(0 < statTitle.length && 0 < statDescription.length) && (
        <p><strong>{statTitle}</strong>{' '}{statDescription}</p>
      )}
    </div>

    {0 < relatedStories.length && (
      <div className={styles.relatedStoryGroup}>
        <h2 className={styles.relatedHeader}>
          {__('Related Stories', 'mittr')}
        </h2>
        <ul className={styles.relatedStories}>
          {relatedStories.map((story) => (
            <li className={styles.relatedStory} key={story.title}>
              <div className={styles.relatedStoryImage}>
                {toReactElement(story.image)}
              </div>
              <Link
                to={story.permalink}
                className={styles.relatedStoryLink}
              >
                {story.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )}
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
  relatedStories: PropTypes.array.isRequired,
};

export default withStyles(styles)(CompanyListItem);
