import React from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { withStyles } from 'critical-style-loader/lib';
import favicon from 'assets/images/favicon.ico';
import ConnectedRoot from 'components/connectedRoot';
import ErrorBoundary from 'components/errorBoundary';
import ErrorMessage from 'components/errorMessage';
import getRoots from 'selectors/getRoots';
import Menu from 'assets/icons/menu.svg';

import styles from './app.css';

const App = (props) => {
  const { error, roots } = props;
  return (
    <ErrorBoundary>
      <Helmet>
        <html lang="en" amp />
        <body className="root" />
        <title>Foo</title>
        <meta name="description" content="Helmet application" />
        <style type="text/css'">
          {'body: { background-color: blue; }'}
        </style>
        <link rel="shortcut icon" href={favicon} />
      </Helmet>
      {error ? (
        <ErrorMessage />
      ) : (
        <div className={styles.wrapper}>
          <Menu />
          {roots.map((name) => (
            <ConnectedRoot key={name} name={name} />
          ))}
        </div>
      )}
    </ErrorBoundary>
  );
};

App.propTypes = {
  roots: PropTypes.arrayOf(PropTypes.string).isRequired,
  error: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  roots: getRoots(state),
  error: !! state.error,
});

const hotReload = hot(module);
const wrapWithStyles = withStyles(styles);
const withRedux = connect(mapStateToProps);
export default hotReload(wrapWithStyles(withRedux(App)));
