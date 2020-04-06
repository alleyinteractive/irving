import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { __ } from '@wordpress/i18n';
import { withStyles } from 'critical-style-loader/lib';
import kebabcase from 'lodash.kebabcase';
import withData from 'components/hoc/withData';
import toReactElement from 'utils/toReactElement';
import MagazineIssuesList from './list';
import MagazineDropdown from './dropdown';

import styles from './magazineIssues.css';

const MagazineIssues = ({ title, issueType, datesAvailable }) => {
  const [issues, setIssues] = useState({
    issues: [],
    lastUpdate: [],
    shouldDisplayLoadMore: true,
  });
  const [userRequest, setUserRequest] = useState({
    currentPage: 1,
    endpoint: `?page=1&issueType=${issueType}`,
  });

  const loadItems = () => {
    const { endpoint, currentPage } = userRequest;

    setUserRequest({
      currentPage: currentPage + 1,
      endpoint: endpoint.replace(/(page)=[^?&]+/, `$1=${currentPage + 1}`),
    });
  };

  const appendIssues = (newData, shouldDisplayLoadMore) => {
    // Ensure that there are no duplicate year cards rendered to the issues list.
    setIssues({
      issues: [...issues.issues, ...newData].filter((issue, index, self) => (
        index === self.findIndex((i) => (
          i.config.title === issue.config.title
        ))
      )),
      lastUpdate: newData,
      shouldDisplayLoadMore,
    });
  };

  const filterIssues = (decade) => {
    const page = 1 < userRequest.currentPage ? 1 : userRequest.currentPage;

    setUserRequest({
      currentPage: 1,
      endpoint:
        `?page=1&issueType=${issueType}&decade=${decade}`
          .replace(/(page)=[^?&]+/, `$1=${page}`),
    });

    // Clear any current issue data from the component's state.
    setIssues({
      issues: [],
      lastUpdate: [],
      shouldDisplayLoadMore: true,
    });
  };

  const Results = withData(`magazine_issues${userRequest.endpoint}`, {})(
    MagazineIssuesList
  );

  const { currentPage } = userRequest;

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
          currentPage={currentPage}
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
  issueType: PropTypes.string.isRequired,
  datesAvailable: PropTypes.array,
};

export default withStyles(styles)(MagazineIssues);
