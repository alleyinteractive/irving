import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';

// Styles
import styles from './listContent.css';

const ListContent = (props) => {
  const {
    children,
  } = props;

  const [companyFlyoutVisible, setCompanyFlyoutVisible] = useState('');

  return (
    <div className={styles.wrapper}>
      <ul className={styles.listWrapper}>
        {(children && children.length) && children.map((child) => (
          <>
            {React.cloneElement(child, {
              setCompanyFlyoutVisible,
              showFlyout: child.props.companyName === companyFlyoutVisible,
            })}
          </>
        ))}
      </ul>
    </div>
  );
};

ListContent.propTypes = {
  children: PropTypes.node.isRequired,
};

export default withStyles(styles)(ListContent);
