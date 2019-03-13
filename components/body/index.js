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
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
  bodyClasses: PropTypes.arrayOf(PropTypes.string),
};

Body.defaultProps = {
  bodyClasses: [],
};

const wrapWithStyles = withStyles(styles);

export default wrapWithStyles(Body);
