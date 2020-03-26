import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';

// Styles
import styles from './list50View.css';

const List50View = (props) => {
  const {
    children,
  } = props;

  const [companyFlyoutVisible, setCompanyFlyoutVisible] = useState('');

  return (
    <ul className={styles.wrapper}>
      {(children && children.length) && children.map((child) => (
        React.cloneElement(child, {
          setCompanyFlyoutVisible,
          showFlyout: child.props.companyName === companyFlyoutVisible,
        })
      ))}
    </ul>
  );
};

List50View.propTypes = {
  children: PropTypes.node.isRequired,
};

export default withStyles(styles)(List50View);
