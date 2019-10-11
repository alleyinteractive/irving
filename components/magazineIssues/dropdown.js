import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import styles from './magazineIssues.css';

class MagazineDropdown extends React.Component {
  static propTypes = {
    datesAvailable: PropTypes.arrayOf([
      PropTypes.number,
    ]).isRequired,
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

export default withStyles(styles)(MagazineDropdown);
