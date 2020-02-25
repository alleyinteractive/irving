import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { getZephrComponents } from 'selectors/zephrRulesSelector';
import get from 'lodash/get';
import styles from './body.css';

const Body = ({ bodyClasses, children, zephrComponents }) => {
  const obscureContent = true === get(
    zephrComponents,
    'obscureContent.zephrOutput',
    false
  );

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
  /**
   * The Zephr components endpoint.
   */
  zephrComponents: PropTypes.object,
};

Body.defaultProps = {
  bodyClasses: [],
  zephrComponents: {},
};

const mapStateToProps = (state) => ({
  zephrComponents: getZephrComponents(state),
});

const wrapWithStyles = withStyles(styles);

export default wrapWithStyles(connect(mapStateToProps)(Body));
