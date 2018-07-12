import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import createGetRootComponent from 'selectors/createGetRootComponent';
import toReactElement from 'utils/toReactElement';

const ConnectedRoot = (props) => toReactElement(props.component);

ConnectedRoot.propTypes = {
  component: PropTypes.shape({
    config: PropTypes.object.isRequired,
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
  const getComponent = createGetRootComponent();
  return function mapStateToProps(state, props) {
    return {
      component: getComponent(state, props),
    };
  };
};

const withRedux = connect(createMapStateToProps);
export default withRedux(ConnectedRoot);
