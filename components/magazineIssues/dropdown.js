import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { UIDReset, UIDConsumer } from 'react-uid';
import { withStyles } from 'critical-style-loader/lib';
import Label from 'components/form/label';
import styles from './magazineIssues.css';
import { __ } from '@wordpress/i18n';

const MagazineDropdown = ({ datesAvailable, filterIssues }) => {
  const [decade, setDecade] = useState(null);

  const handleChange = ({ target: { value } }) => {
    if (value !== decade) {
      setDecade(value);
      filterIssues(value);
    }
  };

  return (
    <UIDReset>
      <UIDConsumer>
        {(id, uid) => {
          const selectID = uid('decadesDropdown');
          return (
            <Fragment>
              <Label className="screen-reader-text" htmlFor={selectID}>
                {__('Choose a decade:', 'mittr')}
              </Label>
              <select
                id={selectID}
                aria-labelledby={selectID}
                className={styles.select}
                onChange={handleChange}
                value={decade || ''}
              >
                <option value="">Year</option>
                {datesAvailable.map((date) => (
                  <option key={date} value={date}>
                    {`${date}s`}
                  </option>
                ))}
              </select>
            </Fragment>
          );
        }}
      </UIDConsumer>
    </UIDReset>
  );
};

MagazineDropdown.propTypes = {
  datesAvailable: PropTypes.arrayOf(
    PropTypes.number
  ).isRequired,
  filterIssues: PropTypes.func.isRequired,
};

export default withStyles(styles)(MagazineDropdown);
