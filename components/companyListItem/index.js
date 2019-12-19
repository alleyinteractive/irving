/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import { __ } from '@wordpress/i18n';
import { withStyles } from 'critical-style-loader/lib';
import Link from 'components/helpers/link';
import classNames from 'classnames';
import toReactElement from 'utils/toReactElement';

import styles from './companyListItem.css';

const CompanyListItem = ({
  rank,
  children,
  companyName,
  headquarters,
  industry,
  status,
  yearsOnList,
  valuation,
  statTitle,
  statDescription,
  relatedStories,
  listYearsAvailable,
}) => (
  <div className={styles.wrapper} id={companyName}>
    <div className={styles.header}>
      <span className={styles.rank}>{rank}</span>
      <h2 className={styles.companyName}>{companyName}</h2>
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
          {/* Some industries may contain HTML that needs to be escaped. */}
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
              const isLastItem = key === yearsOnList.length - 1;

              const foundItem = listYearsAvailable.filter(
                (obj) => obj.name === year
              );

              if (0 < foundItem.length) {
                const { permalink } = foundItem[0];

                if (! isLastItem) {
                  return (
                    <React.Fragment>
                      <Link
                        className={styles.yearLink}
                        to={permalink}
                        key={year}
                      >
                        {year}
                      </Link>
                      {' , '}
                    </React.Fragment>
                  );
                }

                return (
                  <Link
                    className={styles.yearLink}
                    to={permalink}
                    key={year}
                  >
                    {year}
                  </Link>
                );
              }

              if (! isLastItem) {
                return <span key={year}>{year}{' , '}</span>;
              }

              return <span key={year}>{year}</span>;
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
      {children && (
        <p>
          <strong>{__('Summary', 'mittr')}</strong>
          {' '}{children}
        </p>
      )}
      {(0 < statTitle.length && 0 < statDescription.length) && (
        <p><strong>{statTitle}</strong>{' '}{statDescription}</p>
      )}
    </div>

    {0 < relatedStories.length && (
      <div className={styles.relatedStoryGroup}>
        <h3 className={styles.relatedHeader}>
          {__('Related Stories', 'mittr')}
        </h3>

        <ul className={styles.relatedStories}>
          {relatedStories.map((story) => (
            <li
              className={classNames(styles.relatedStory, {
                [styles.noFeaturedImage]: ! story.image,
              })}
              key={story.title}
            >
              {story.image && (
                <div className={styles.relatedStoryImage}>
                  {toReactElement(story.image)}
                </div>
              )}

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

CompanyListItem.defaultProps = {
  children: [],
};

CompanyListItem.propTypes = {
  rank: PropTypes.number.isRequired,
  children: PropTypes.arrayOf(PropTypes.element),
  companyName: PropTypes.string.isRequired,
  headquarters: PropTypes.string.isRequired,
  industry: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  valuation: PropTypes.string.isRequired,
  yearsOnList: PropTypes.arrayOf(PropTypes.number).isRequired,
  statTitle: PropTypes.string.isRequired,
  statDescription: PropTypes.string.isRequired,
  relatedStories: PropTypes.array.isRequired,
  listYearsAvailable: PropTypes.array.isRequired,
};

export default withStyles(styles)(CompanyListItem);
