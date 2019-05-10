import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  actionRequestComponentData,
} from 'actions/componentDataActions';

const AsyncRenderer = (props) => {
  const {
    componentProps,
    componentData,
    Component,
    fetchComponentData,
    isComponentLoading,
    isComponentError,
    isDataLoading,
    isDataError,
    componentName,
  } = props;

  // If there's an endpoint slug, fetch data from that endpoint.
  if (componentName) {
    /**
     * Effect for fetching component data, if applicable.
     */
    useEffect(() => {
      fetchComponentData(componentName);
    }, []);
  }

  // Render loading state if either component or data are still loading.
  if (isComponentLoading || isDataLoading) {
    return <div>loading...</div>;
  }

  // Render error state if component or data fails to load.
  if (isComponentError || isDataError) {
    return <div>error</div>;
  }

  // Return component.
  return <Component {...componentProps} data={componentData} />;
};

AsyncRenderer.propTypes = {
  componentProps: PropTypes.object,
  Component: PropTypes.func.isRequired,
  componentData: PropTypes.object.isRequired,
  fetchComponentData: PropTypes.func.isRequired,
  isComponentLoading: PropTypes.bool,
  isComponentError: PropTypes.bool,
  isDataLoading: PropTypes.bool.isRequired,
  isDataError: PropTypes.bool.isRequired,
  componentName: PropTypes.string,
};

AsyncRenderer.defaultProps = {
  componentProps: {},
  componentName: false,
  isComponentLoading: false,
  isComponentError: false,
};

const mapStateToProps = (state, ownProps) => {
  const componentState = state[ownProps.componentName];

  return {
    isDataLoading: componentState.loading,
    isDataError: componentState.error,
    componentData: componentState.data,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchComponentData: () => {
    dispatch(actionRequestComponentData(ownProps.componentName));
  },
});

const withRedux = connect(mapStateToProps, mapDispatchToProps);

export default withRedux(AsyncRenderer);
