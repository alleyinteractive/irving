import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import { Helmet } from 'react-helmet';
import classNames from 'classnames';
import styles from './body.css';

class Body extends Component {
  render() {
    const { bodyClasses, children } = this.props;

    return (
      <Fragment>
        <Helmet>
          <body className={classNames(bodyClasses)} />
        </Helmet>
        <main role="main" id="content">
          {children}
        </main>
      </Fragment>
    );
  }
}

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
