import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import createGetRootComponent from '../../selectors/createGetRootComponent';
import toReactElement from '../../utils/toReactElement';

const ConnectedRoot = (props) => {
  const { apiComponent } = props;

  return (
    <>
      {toReactElement(apiComponent)}
    </>
  );
};

ConnectedRoot.propTypes = {
  /**
   * Root component object derived from current state
   */
  apiComponent: PropTypes.shape({
    /**
     * Component configuration (mapped to props)
     */
    config: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    /**
     * Component children
     */
    children: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
};

/**
 * Each ConnectedRoot component will receive it's own copy of the state mapper,
 * which allows the createGetRootComponent factory to create a memoized copy
 * of the getComponent selector with access to the component's props.
 *
 * In essence this allows each ConnectedRoot to be isolated, and only re-render
 * when its own related Redux state changes. For example, a ConnectedRoot that
 * renders the body component will only update if the corresponding Redux body
 * component state changes.
 * @returns {function} - Redux state mapper function
 */
const createMapStateToProps = () => {
  const getApiComponent = createGetRootComponent();
  return function mapStateToProps(state, props) {
    return {
      apiComponent: getApiComponent(state, props),
      loading: state.loading,
    };
  };
};

const withRedux = connect(createMapStateToProps);
export default withRedux(ConnectedRoot);
