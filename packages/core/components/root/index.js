import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import RootProviders from 'components/rootProviders';
import ConnectedRoot from 'components/connectedRoot';
import getRoots from 'selectors/getRoots';
import getProviders from 'selectors/getProviders';

const Root = (props) => {
  const {
    roots,
    providers,
  } = props;

  return (
    <RootProviders providers={providers}>
      {roots.map((name) => (
        <ConnectedRoot key={name} name={name} />
      ))}
    </RootProviders>
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
  providers: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  roots: getRoots(state),
  providers: getProviders(state),
});

export default connect(mapStateToProps)(Root);
