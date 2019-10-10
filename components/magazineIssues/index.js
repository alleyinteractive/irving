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
    lastUpdate: [],
    shouldDisplayLoadMore: true,
  });
  const [userRequest, setUserRequest] = useState({
    currentPage: 1,
    endpoint: `?page=1&issueType=${issueTypeId}`,
  });
  const [datesAvailable, setDatesAvailable] = useState({
    decades: [],
  });

  const loadItems = () => {
    setUserRequest({
      currentPage: userRequest.currentPage + 1,
      endpoint: `?page=${userRequest.currentPage + 1}&issueType=${issueTypeId}`,
    });
  };

  const appendIssues = (newData, shouldDisplayLoadMore) => {
    const newIssues = [...issues.issues, ...newData];

    setIssues({
      issues: newIssues,
      lastUpdate: newData,
      shouldDisplayLoadMore,
    });

    // Update the list of decades in the range of currently appended issues.
    const decades = new Set(
      newIssues
        .map(({ config: { issueYear } }) => issueYear)
        .map((date) => parseInt(date / 10, 10) * 10)
    );

    setDatesAvailable({
      decades: [...decades],
    });
  };

  const Results = withData(`magazine_issues${userRequest.endpoint}`, {})(
    MagazineIssuesList
  );

  const filterIssues = (e) => {
    setIssues({
      issues: issues.issues.filter(
        ({ config: { issueYear } }) => issueYear === e.target.value
      ),
      issueDates: issues.issueDates,
      shouldDisplayLoadMore: issues.shouldDisplayLoadMore,
    });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h2 className={styles.title} id={kebabcase(title)}>
            {title}
          </h2>
          <select onChange={filterIssues} className={styles.select}>
            <option value="">Year</option>
            {datesAvailable.decades.map((decade) => (
              <option
                key={decade}
                value={decade}
              >
                {`${decade}s`}
              </option>
            ))}
          </select>
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
