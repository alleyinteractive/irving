import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import { Helmet } from 'react-helmet';
import classNames from 'classnames';
import useObscureContent from 'hooks/useObscureContent';
import styles from './body.css';

const Body = ({ bodyClasses, children }) => {
  const obscureContent = useObscureContent();

  return (
    <>
      <Helmet>
        <body className={
          classNames(
            bodyClasses,
            { [styles.obscureContent]: obscureContent }
          )}
        />
      </Helmet>
      <main className={styles.content} id="content">
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
