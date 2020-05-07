import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import getDisplayName from 'utils/getDisplayName';
import DefaultLoading from 'components/helpers/defaultLoading';

const withLoader = (WrappedComponent, loadingProps) => {
  const Loader = (props) => {
    const { loading } = props;
    return loading ? (
      <DefaultLoading {...loadingProps} />
    ) : (
      <WrappedComponent {...props} />
    );
  };

  Loader.propTypes = {
    /**
     * Prop indicating whether or not the page is still loading
     */
    loading: PropTypes.bool.isRequired,
  };

  Loader.displayName = getDisplayName('Loader', WrappedComponent);

  const mapStateToProps = (state) => ({ loading: state.loading });
  const withRedux = connect(mapStateToProps);

  return withRedux(Loader);
};

/** @component */
export default withLoader;
