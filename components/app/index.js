import React from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import favicon from 'assets/images/favicon.ico';
import { getRootReactComponents } from 'selectors/components';

import styles from './app.css';

const App = (props) => (
  <React.Fragment>
    <Helmet>
      <link rel="shortcut icon" href={favicon} />
    </Helmet>
    {props.components.map((component) => (
      <component.Component key={component.key} name={component.key} />
    ))}
  </React.Fragment>
);

App.propTypes = {
  components: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired,
    Component: PropTypes.element.isRequired,
  })).isRequired,
};

const mapStateToProps = (state) => ({
  components: getRootReactComponents(state),
});

const hotReload = hot(module);
const wrapWithStyles = withStyles(styles);
const withRedux = connect(mapStateToProps);
export default hotReload(wrapWithStyles(withRedux(App)));
