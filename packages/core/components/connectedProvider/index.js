import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import createGetProviderConfig from 'selectors/createGetProviderConfig';
import toProvider from 'utils/toProvider';

const ConnectedProvider = (props) => {
  const {
    children,
    config,
    name,
  } = props;

  return toProvider(name, config, children);
};

ConnectedProvider.propTypes = {
  /**
   * Provider name.
   */
  name: PropTypes.string.isRequired,
  /**
   * Component configuration (mapped to props)
   */
  config: PropTypes.object.isRequired,
  /**
   * Component children
   */
  children: PropTypes.arrayOf(PropTypes.object).isRequired,
};

/**
 * Each ConnectedProvider component will receive it's own copy of the state mapper,
 * which allows the createGetProviderConfig factory to create a memoized copy
 * of the getComponent selector with access to the component's props.
 *
 * In essence this allows each ConnectedRoot to be isolated, and only re-render
 * when its own related Redux state changes. For example, a ConnectedRoot that
 * renders the body component will only update if the corresponding Redux body
 * component state changes.
 * @returns {function} - Redux state mapper function
 */
const createMapStateToProps = () => {
  const getProviderConfig = createGetProviderConfig();
  return function mapStateToProps(state, props) {
    return {
      config: getProviderConfig(state, props),
    };
  };
};

const withRedux = connect(createMapStateToProps);
export default withRedux(ConnectedProvider);
