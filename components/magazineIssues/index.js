import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import kebabcase from 'lodash.kebabcase';
import { __ } from '@wordpress/i18n';
import withData from 'components/hoc/withData';
import toReactElement from 'utils/toReactElement';
import MagazineIssuesList from './list';
import MagazineDropdown from './dropdown';
import styles from './magazineIssues.css';

const MagazineIssues = ({ title, issueTypeId, datesAvailable }) => {
  const [issues, setIssues] = useState({
    issues: [],
    lastUpdate: [],
    shouldDisplayLoadMore: true,
  });
  const [userRequest, setUserRequest] = useState({
    currentPage: 1,
    endpoint: `?page=1&issueType=${issueTypeId}`,
  });

  const loadItems = () => {
    setUserRequest({
      currentPage: userRequest.currentPage + 1,
      endpoint: `?page=${userRequest.currentPage + 1}&issueType=${issueTypeId}`,
    });
  };

  const appendIssues = (newData, shouldDisplayLoadMore) => {
    setIssues({
      issues: [...issues.issues, ...newData],
      lastUpdate: newData,
      shouldDisplayLoadMore,
    });
  };

  const filterIssues = (decade) => {
    /* eslint-disable max-len */
    setUserRequest({
      currentPage: 1,
      endpoint: `?page=${userRequest.currentPage + 1}&issueType=${issueTypeId}&decade=${decade}`,
    });
    /* eslint-enable */
  };

  const Results = withData(`magazine_issues${userRequest.endpoint}`, {})(
    MagazineIssuesList
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h2 className={styles.title} id={kebabcase(title)}>
            {title}
          </h2>
          <MagazineDropdown
            filterIssues={filterIssues}
            datesAvailable={datesAvailable}
          />
        </header>

        <ul className={styles.list} aria-labelledby={kebabcase(title)}>
          {issues.issues.map((issue) => (
            <li key={issue.config.title} className={styles.item}>
              {toReactElement(issue)}
            </li>
          ))}
        </ul>

        <Results
          labelID={kebabcase(title)}
          setData={appendIssues}
          lastUpdate={issues.lastUpdate || []}
        />

        {issues.shouldDisplayLoadMore && (
          <button className={styles.button} type="button" onClick={loadItems}>
            {__('Load more past issues', 'mittr')}
          </button>
        )}
      </div>
    </div>
  );
};

MagazineIssues.defaultProps = {
  datesAvailable: [],
};

MagazineIssues.propTypes = {
  title: PropTypes.string.isRequired,
  issueTypeId: PropTypes.string.isRequired,
  datesAvailable: PropTypes.array,
};

export default withStyles(styles)(MagazineIssues);
