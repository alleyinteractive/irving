import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
// import withThemes from 'components/hoc/withThemes';

// Child components
import Authenticated from './authenticated';
import Anonymous from './anonymous';

// Styles
import styles from './userGreeting.css';
// import darkStyles from './dark.css';
// import lightStyles from './light.css';

const UserGreeting = ({
  firstName, lastName, isAuthenticated, themeName,
}) => (
  <div className={styles.wrapper}>
    {isAuthenticated ? (
      <Authenticated
        firstName={firstName}
        lastName={lastName}
        themeName={themeName}
      />
    ) : (
      <Anonymous themeName={themeName} />
    )}
  </div>
);

UserGreeting.propTypes = {
  firstName: PropTypes.string.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  lastName: PropTypes.string.isRequired,
  themeName: PropTypes.string,
};

UserGreeting.defaultProps = {
  themeName: 'light',
};

export default withStyles(styles)(UserGreeting);

// const wrapWithStyles = withStyles(styles, lightStyles, darkStyles);

// export default wrapWithThemes(wrapWithStyles(UserGreeting));
