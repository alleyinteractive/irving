import React from 'react';
import PropTypes from 'prop-types';
import getDisplayName from 'utils/getDisplayName';
import PlaceholderLoading from 'components/placeholderLoading';

const withLoader = (WrappedComponent) => {
  const Loader = (props) => {
    const { loading } = props;
    return loading ? (
      <PlaceholderLoading />
    ) : (
      <WrappedComponent {...props} />
    );
  };

  Loader.propTypes = {
    loading: PropTypes.bool.isRequired,
  };

  Loader.displayName = getDisplayName('Loader', WrappedComponent);

  return Loader;
};

export default withLoader;
