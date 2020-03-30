import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
// import withThemes from 'components/hoc/withThemes';
import { connect } from 'react-redux';
import {
  getProfile,
  getFirstName,
  getLastName,
} from 'selectors/zephrSelector';

// Child components
import Authenticated from './authenticated';
import Anonymous from './anonymous';

// Styles
import styles from './userGreeting.css';
// import darkStyles from './dark.css';
// import lightStyles from './light.css';

const UserGreeting = ({
  isAuthenticated,
  firstName,
  lastName,
  themeName,
  context,
}) => (
  <div className={styles.wrapper}>
    {isAuthenticated && 0 < firstName.length ? (
      <Authenticated
        firstName={firstName}
        lastName={lastName}
        themeName={themeName}
      />
    ) : (
      <Anonymous themeName={themeName} context={context} />
    )}
  </div>
);

UserGreeting.defaultProps = {
  themeName: 'light',
  context: 'nav',
};

UserGreeting.propTypes = {
  firstName: PropTypes.string.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  lastName: PropTypes.string.isRequired,
  themeName: PropTypes.string,
  context: PropTypes.string,
};

const withRedux = connect(
  (state) => ({
    isAuthenticated: 0 < Object.keys(getProfile(state)).length,
    firstName: getFirstName(state) || '',
    lastName: getLastName(state) || '',
  }),
  null,
);

export default withRedux(withStyles(styles)(UserGreeting));

// const wrapWithStyles = withStyles(styles, lightStyles, darkStyles);

// export default wrapWithThemes(wrapWithStyles(UserGreeting));
