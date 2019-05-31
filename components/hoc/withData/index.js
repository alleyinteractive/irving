import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { URL } from 'whatwg-url';
import { actionRequestComponentData } from 'actions/componentDataActions';
import { componentDataMeta } from 'reducers/defaultState';
import createComponentDataKey from 'utils/createComponentDataKey';
import DataLoading from './loading';
import DataError from './error';

const withData = (
  endpoint,
  opts = {
    loading: DataLoading,
    error: DataError,
    refreshOnMount: false,
  }
) => (WrappedComponent) => {
  const {
    loading: Loading,
    error: Error,
    refreshOnMount,
  } = opts;

  const DataProvider = (props) => {
    const {
      componentData,
      fetchComponentData,
      isDataLoading,
      isDataError,
    } = props;
    let requestUrl;

    if (endpoint.includes('/')) {
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
      requestUrl = `${process.env.API_ROOT_URL}/data/${endpoint}`;
    }

    /**
     * Effect for fetching component data, if applicable.
     */
    useEffect(() => {
      // Only fetch if we haven't already or refreshOnMount is set,
      // otherwise refreshing of data must be explicit.
      if (
        refreshOnMount ||
        (! componentData || ! componentData.length)
      ) {
        fetchComponentData(requestUrl);
      }
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
    return (
      <WrappedComponent
        {...props}
        data={componentData}
        refresh={() => { fetchComponentData(requestUrl, true); }}
      />
    );
  };

  DataProvider.propTypes = {
    componentData: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
    ]).isRequired,
    fetchComponentData: PropTypes.func.isRequired,
    isDataLoading: PropTypes.bool.isRequired,
    isDataError: PropTypes.bool.isRequired,
  };

  const mapStateToProps = (state) => {
    const key = createComponentDataKey(endpoint);
    let meta = componentDataMeta;

    if (state.componentData[key]) {
      meta = state.componentData[key];
    }

    return {
      isDataLoading: meta.loading,
      isDataError: meta.error,
      componentData: meta.data,
    };
  };

  const mapDispatchToProps = (dispatch) => ({
    fetchComponentData: (requestUrl, refresh = false) => {
      dispatch(actionRequestComponentData(requestUrl, refresh));
    },
  });

  const withRedux = connect(mapStateToProps, mapDispatchToProps);

  return withRedux(DataProvider);
};

export default withData;
