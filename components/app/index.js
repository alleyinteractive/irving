import React from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader/root';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { withStyles } from 'critical-style-loader/lib';
import favicon from 'assets/images/favicon.ico';
import RootProviders from 'components/rootProviders';
import ConnectedRoot from 'components/connectedRoot';
import ErrorBoundary from 'components/errorBoundary';
import ErrorMessage from 'components/errorMessage';
import getRoots from 'selectors/getRoots';
import getProviders from 'selectors/getProviders';
import ArticleFooter from 'components/zephrUI/articleFooter';
import styles from './app.css';
import OneTrust from './oneTrust';

const App = (props) => {
  const { error, roots, providers } = props;
  return (
    <ErrorBoundary>
      <Helmet>
        <link rel="shortcut icon" href={favicon} />
      </Helmet>
      {error ? (
        <ErrorMessage />
      ) : (
        <div className={styles.wrapper}>
          <a href="#content" className={styles.skipLink}>
            Skip to Content
          </a>
          <RootProviders providers={providers}>
            {roots.map((name) => (
              <ConnectedRoot key={name} name={name} />
            ))}
          </RootProviders>
          <ArticleFooter />
        </div>
      )}
      <OneTrust />
    </ErrorBoundary>
  );
};

App.propTypes = {
  /**
   * Root component configurations
   */
  roots: PropTypes.arrayOf(PropTypes.string).isRequired,
  /**
   * Was there an error loading the page/components?
   */
  error: PropTypes.bool.isRequired,
  /**
   * Root provider configurations
   */
  providers: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  roots: getRoots(state),
  providers: getProviders(state),
  error: !! state.error,
});

const wrapWithStyles = withStyles(styles);
const withRedux = connect(mapStateToProps);
export default hot(wrapWithStyles(withRedux(App)));
