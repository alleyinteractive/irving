import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import kebabcase from 'lodash.kebabcase';
import { __ } from '@wordpress/i18n';
import withData from 'components/hoc/withData';
import toReactElement from 'utils/toReactElement';
import MagazineIssuesList from './list';
import styles from './magazineIssues.css';

const MagazineIssues = ({ title, issueTypeId }) => {
  const [issues, setIssues] = useState({
    issues: [],
    issueDates: [],
    lastUpdate: [],
    shouldDisplayLoadMore: true,
  });
  const [userRequest, setUserRequest] = useState({
    currentPage: 1,
    endpoint: `?page=1&issueType=${issueTypeId}`,
  });

  const loadItems = async () => {
    setUserRequest({
      currentPage: userRequest.currentPage + 1,
      endpoint: `?page=${userRequest.currentPage + 1}&issueType=${issueTypeId}`,
    });
  };

  const appendIssues = (newData, shouldDisplayLoadMore) => {
    const newIssues = [...issues.issues, ...newData];

    setIssues({
      issues: newIssues,
      issueDates: newIssues.map(({ config: { issueYear } }) => issueYear),
      lastUpdate: newData,
      shouldDisplayLoadMore,
    });
  };

  const Results = withData(`magazine_issues${userRequest.endpoint}`, {})(
    MagazineIssuesList
  );

  const renderDropdown = () => {
    // Build an array of years rounded down to the nearest decade.
    let decades = issues.issueDates.map(
      (date) => parseInt(date / 10, 10) * 10
    );
    const decadeSet = new Set(decades);
    // Replace the decades array with a set of unique IDs.
    decades = [...decadeSet];

    return (
      <select className={styles.select}>
        <option value="">Year</option>
        {decades.map((decade) => (
          <option key={decade} value={decade}>
            {`${decade}s`}
          </option>
        ))}
      </select>
    );
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h2 className={styles.title} id={kebabcase(title)}>
            {title}
          </h2>
          {renderDropdown()}
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

MagazineIssues.propTypes = {
  title: PropTypes.string.isRequired,
  issueTypeId: PropTypes.string.isRequired,
};

export default withStyles(styles)(MagazineIssues);
