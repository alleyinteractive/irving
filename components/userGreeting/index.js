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
import { actionRequestUserLogOut } from 'actions/zephrActions';

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
  logOut,
}) => (
  <div className={styles.wrapper}>
    {isAuthenticated ? (
      <React.Fragment>
        <Authenticated
          firstName={firstName}
          lastName={lastName}
          themeName={themeName}
        />
        {/* @todo remove me. this is temporary for testing log out service */}
        <button
          className={styles.button}
          type="button"
          style={{ marginLeft: '10px' }}
          onClick={logOut}
        >
          Log out
        </button>
      </React.Fragment>
    ) : (
      <Anonymous themeName={themeName} />
    )}
  </div>
);

UserGreeting.defaultProps = {
  themeName: 'light',
};

UserGreeting.propTypes = {
  firstName: PropTypes.string.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  lastName: PropTypes.string.isRequired,
  themeName: PropTypes.string,
  logOut: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  logOut: () => dispatch(actionRequestUserLogOut()),
});

const withRedux = connect(
  (state) => ({
    isAuthenticated: 0 < Object.keys(getProfile(state)).length,
    firstName: getFirstName(state) || '',
    lastName: getLastName(state) || '',
  }),
  mapDispatchToProps,
);

export default withRedux(withStyles(styles)(UserGreeting));

// const wrapWithStyles = withStyles(styles, lightStyles, darkStyles);

// export default wrapWithThemes(wrapWithStyles(UserGreeting));
