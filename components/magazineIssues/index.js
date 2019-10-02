import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import kebabcase from 'lodash.kebabcase';
import { __ } from '@wordpress/i18n';
import withData from 'components/hoc/withData';
import MagazineIssuesList from './list';
import styles from './magazineIssues.css';

const MagazineIssues = ({ title, issueTypeId }) => {
  const [issues, setIssues] = useState({
    issues: [],
    lastUpdate: [],
  });
  const [userRequest, setUserRequest] = useState({
    currentPage: 0,
    endpoint: `?page=0&issueType=${issueTypeId}`,
  });

  const loadItems = () => {
    setUserRequest({
      currentPage: userRequest.currentPage + 1,
      endpoint: `?page=${userRequest.currentPage + 1}&issueType=${issueTypeId}`,
    });
    // updateShouldRefresh(false);
  };

  const Results = withData(`magazine_issues${userRequest.endpoint}`, {
    loading: () => <div>{__('Loading', 'mittr')}</div>,
  })(MagazineIssuesList);

  // @todo this is not appending the new endpoint to the list, its
  // adding it like three times, we need to keep the component from hitting
  // the endoint several times.
  const appendIssues = (newData) => {
    // if (issues !== issuesToAppend) {
    //   setIssues([...issues, ...issuesToAppend]);
    // }

    debugger; // eslint-disable-line

    // Append the issues, if they are new, to issues.
    if (issues.lastUpdate !== newData) {
      setIssues({
        issues: [].concat(issues.issues, newData),
        lastUpdate: newData,
      });
    } else {
      setIssues({
        issues: issues.issues,
        lastUpdate: newData,
      });
    }

    // Update data with last request.
    // updateShouldRefresh(false);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h2 className={styles.title} id={kebabcase(title)}>
            {title}
          </h2>
          {/* @todo make this update component on select. */}
          <select className={styles.select}>
            <option value="">Year</option>
            <option value="2000">2000s</option>
            <option value="2010">2010s</option>
            <option value="1990">1990s</option>
          </select>
        </header>
        <Results
          labelID={kebabcase(title)}
          setData={appendIssues}
          issues={issues.issues}
          lastUpdate={issues.lastUpdate}
        />
        <button className={styles.button} type="button" onClick={loadItems}>
          {__('Load more past issues', 'mittr')}
        </button>
      </div>
    </div>
  );
};

MagazineIssues.propTypes = {
  title: PropTypes.string.isRequired,
  issueTypeId: PropTypes.string.isRequired,
};

export default withStyles(styles)(MagazineIssues);
