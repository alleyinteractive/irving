import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ConnectedProvider from 'components/connectedProvider';
import ConnectedRoot from 'components/connectedRoot';
import getRoots from 'selectors/getRoots';
import getProviders from 'selectors/getProviders';

const Root = (props) => {
  const {
    roots,
    providers,
  } = props;

  return (
    <>
      {providers.reduce(
        (children, providerName) => (
          (
            <ConnectedProvider
              key={providerName}
              name={providerName}
            >
              {children}
            </ConnectedProvider>
          )
        ),
        roots.map((name) => (
          <ConnectedRoot key={name} name={name} />
        ))
      )}
    </>
  );
};

Root.propTypes = {
  /**
   * Root component configurations
   */
  roots: PropTypes.arrayOf(PropTypes.string).isRequired,
  /**
   * Root provider configurations
   */
  providers: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = (state) => ({
  roots: getRoots(state),
  providers: getProviders(state),
});

export default connect(mapStateToProps)(Root);
