import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import styles from './list50Content.css';

const List50Content = (props) => {
  const {
    children,
  } = props;

  const [companyFlyoutVisible, setCompanyFlyoutVisible] = useState('');

  return (
    <div className={styles.wrapper}>
      <ul className={styles.listWrapper}>
        {(children && children.length) && children.map((child) => (
          React.cloneElement(child, {
            setCompanyFlyoutVisible,
            showFlyout: child.props.companyName === companyFlyoutVisible,
          })
        ))}
      </ul>
    </div>
  );
};

List50Content.propTypes = {
  children: PropTypes.node.isRequired,
};

export default withStyles(styles)(List50Content);
