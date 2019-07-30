import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import { Helmet } from 'react-helmet';
import classNames from 'classnames';
import styles from './body.css';

const Body = (props) => {
  const { bodyClasses, children } = props;

  return (
    <>
      <Helmet>
        <body className={classNames(bodyClasses)} />
      </Helmet>
      <main classNames={styles.content} id="content">
        {children}
      </main>
    </>
  );
};

Body.propTypes = {
  /**
   * Children of the body component.
   */
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
  /**
   * Additional classes to apply to the <body> tag using react-helmet.
   */
  bodyClasses: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.string,
  ]),
};

Body.defaultProps = {
  bodyClasses: [],
};

const wrapWithStyles = withStyles(styles);

export default wrapWithStyles(Body);
