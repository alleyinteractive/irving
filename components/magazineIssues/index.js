/* eslint-disable react/no-unused-state */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import kebabcase from 'lodash.kebabcase';
import { __ } from '@wordpress/i18n';
import withData from 'components/hoc/withData';
import toReactElement from 'utils/toReactElement';
import MagazineIssuesList from './list';
import styles from './magazineIssues.css';

/* eslint-disable react/no-multi-comp*/
class MagazineDropdown extends React.Component {
  static propTypes = {
    datesAvailable: PropTypes.array.isRequired,
    filterIssues: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      decade: null,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { decade } = this.state;
    const newDecade = event.target.value;

    if (event.target.value !== decade) {
      this.setState({ decade: newDecade });

      const { filterIssues } = this.props;
      filterIssues(newDecade);
    }
  }

  render() {
    const { datesAvailable } = this.props;
    const { decade } = this.state;

    return (
      <select
        className={styles.select}
        onChange={this.handleChange}
        value={decade}
      >
        <option value="">Year</option>
        {datesAvailable.map((dc) => (
          <option
            key={dc}
            value={dc}
          >
            {`${dc}s`}
          </option>
        ))}
      </select>
    );
  }
}

class MagazineIssues extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    issueTypeId: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);

    const { issueTypeId } = props;

    this.state = {
      userRequest: {
        currentPage: 1,
        endpoint: `?page=1&issueType=${issueTypeId}`,
      },
      issues: {
        issues: [],
        lastUpdate: [],
        shouldDisplayLoadMore: true,
      },
      datesAvailable: [],
    };

    this.loadItems = this.loadItems.bind(this);
    this.appendIssues = this.appendIssues.bind(this);
    this.filterIssues = this.filterIssues.bind(this);
  }

  loadItems = () => {
    const { issueTypeId } = this.props;

    this.setState((prevState) => ({
      userRequest: {
        currentPage: prevState.currentPage + 1,
        endpoint: `?page=${prevState.currentPage + 1}&issueType=${issueTypeId}`,
      },
    }));
  }

  appendIssues = (newData, shouldDisplayLoadMore) => {
    const { issues } = this.state;
    const newIssues = [...issues.issues, ...newData];

    this.setState({
      issues: {
        issues: newIssues,
        lastUpdate: newData,
        shouldDisplayLoadMore,
      },
    });

    // Update the list of decades in the range of currently appended issues.
    const decades = new Set(
      newIssues
        .map(({ config: { issueYear } }) => issueYear)
        .map((date) => parseInt(date / 10, 10) * 10)
    );

    this.setState({ datesAvailable: [...decades] });
  }

  filterIssues = (decade) => {
    const { issueTypeId } = this.props;

    /* eslint-disable max-len */
    this.setState((prevState) => ({
      userRequest: {
        userRequest: prevState.currentPage,
        endpoint: `?page=${prevState.currentPage}&issueType=${issueTypeId}&decade=${decade}`,
      },
    }));
    /* eslint-enable */
  }

  render() {
    const { title } = this.props;
    const {
      datesAvailable,
      issues,
      userRequest: {
        endpoint,
      },
    } = this.state;

    const Results = withData(`magazine_issues${endpoint}`, {})(
      MagazineIssuesList
    );

    console.log(endpoint);

    return (
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <header className={styles.header}>
            <h2 className={styles.title} id={kebabcase(title)}>
              {title}
            </h2>
            <MagazineDropdown
              filterIssues={this.filterIssues}
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
            setData={this.appendIssues}
            lastUpdate={issues.lastUpdate || []}
          />

          {issues.shouldDisplayLoadMore && (
            <button
              className={styles.button}
              type="button"
              onClick={this.loadItems}
            >
              {__('Load more past issues', 'mittr')}
            </button>
          )}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(MagazineIssues);
