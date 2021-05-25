import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actionRequestComponentData } from 'actions/componentDataActions';
import { componentDataMeta } from 'reducers/defaultState';
import createComponentDataKey from 'utils/createComponentDataKey';
import DataPlaceholder from './placeholder';
import DataLoading from './loading';
import DataError from './error';
import getRequestUrl from './getRequestUrl';

const withData = (
  endpoint,
  opts = {},
) => (WrappedComponent) => {
  const {
    placeholder: Placeholder = DataPlaceholder,
    loading: Loading = DataLoading,
    error: Error = DataError,
    refreshOnMount = false,
    cache = false,
  } = opts;
  const requestUrl = getRequestUrl(endpoint);

  const DataProvider = (props) => {
    const {
      componentData,
      fetchComponentData,
      isDataLoading,
      isDataLoaded,
      isDataError,
    } = props;

    /**
     * Effect for fetching component data, if applicable.
     */
    useEffect(() => {
      // Only fetch if we haven't already or refreshOnMount is set,
      // otherwise refreshing of data must be explicit.
      if (
        refreshOnMount
        || (!componentData || !componentData.length)
      ) {
        fetchComponentData(requestUrl, cache);
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
    if (isDataLoaded && !isDataLoading) {
      return (
        <WrappedComponent
          {...props}
          data={componentData}
          refresh={() => { fetchComponentData(requestUrl, true); }}
        />
      );
    }

    return <Placeholder />;
  };

  DataProvider.propTypes = {
    componentData: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
    ]).isRequired,
    fetchComponentData: PropTypes.func.isRequired,
    isDataLoading: PropTypes.bool.isRequired,
    isDataLoaded: PropTypes.bool.isRequired,
    isDataError: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.object,
    ]).isRequired,
  };

  const mapStateToProps = (state) => {
    const key = createComponentDataKey(requestUrl);
    let meta = componentDataMeta;

    if (state.componentData[key]) {
      meta = state.componentData[key];
    }

    return {
      isDataLoading: meta.loading,
      isDataLoaded: meta.loaded,
      isDataError: meta.error,
      componentData: meta.data,
    };
  };

  const mapDispatchToProps = (dispatch) => ({
    fetchComponentData: (endpointUrl, refresh = false) => {
      dispatch(actionRequestComponentData(endpointUrl, refresh));
    },
  });

  const withRedux = connect(mapStateToProps, mapDispatchToProps);

  return withRedux(DataProvider);
};

/** @component */
export default withData;
