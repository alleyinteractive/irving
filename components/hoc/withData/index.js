import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { URL } from 'whatwg-url';
import { actionRequestComponentData } from 'actions/componentDataActions';
import DataLoading from './loading';
import DataError from './error';

const withData = (componentName, opts = {}) => (WrappedComponent) => {
  const {
    endpoint = false,
    loading: Loading = DataLoading,
    error: Error = DataError,
  } = opts;

  const DataProvider = (props) => {
    const {
      componentData,
      fetchComponentData,
      isDataLoading,
      isDataError,
    } = props;
    let requestUrl;

    if (endpoint) {
      try {
        // If endpoint is absolute, use it as-is.
        const urlObj = new URL(endpoint);

        if (urlObj.host) {
          requestUrl = endpoint;
        }
      } catch (e) {
        // Endpoint is relative, add it to end of configured API_ROOT_URL
        requestUrl = `${process.env.API_ROOT_URL}/${endpoint}`;
      }
    } else {
      // Use component data endpoint.
      requestUrl = `${process.env.API_ROOT_URL}/data/${componentName}`;
    }

    /**
     * Effect for fetching component data, if applicable.
     */
    useEffect(() => {
      fetchComponentData(requestUrl);
    }, []);

    // Render loading state if either component or data are still loading.
    if (isDataLoading) {
      return <Loading />;
    }

    // Render error state if component or data fails to load.
    if (isDataError) {
      return <Error />;
    }

    // Return component.
    return <WrappedComponent {...props} data={componentData} />;
  };

  DataProvider.propTypes = {
    componentData: PropTypes.object.isRequired,
    fetchComponentData: PropTypes.func.isRequired,
    isDataLoading: PropTypes.bool.isRequired,
    isDataError: PropTypes.bool.isRequired,
  };

  const mapStateToProps = (state) => {
    const componentState = state[componentName];

    return {
      isDataLoading: componentState.loading,
      isDataError: componentState.error,
      componentData: componentState.data,
    };
  };

  const mapDispatchToProps = (dispatch) => ({
    fetchComponentData: (requestUrl) => {
      dispatch(actionRequestComponentData(componentName, requestUrl));
    },
  });

  const withRedux = connect(mapStateToProps, mapDispatchToProps);

  return withRedux(DataProvider);
};

export default withData;
