import React from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import favicon from 'assets/images/favicon.ico';
import getElements from 'selectors/getElements';

import styles from './app.css';

const App = (props) => (
  <React.Fragment>
    <Helmet>
      <link rel="shortcut icon" href={favicon} />
    </Helmet>
    {props.elements}
  </React.Fragment>
);

App.propTypes = {
  elements: PropTypes.arrayOf(PropTypes.element).isRequired,
};

const mapStateToProps = (state) => ({
  elements: getElements(state),
});

const hotReload = hot(module);
const wrapWithStyles = withStyles(styles);
const withRedux = connect(mapStateToProps);
export default hotReload(wrapWithStyles(withRedux(App)));
