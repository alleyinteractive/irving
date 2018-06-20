import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import createGetRootComponent from 'selectors/createGetRootComponent';
import toReactElement from 'utils/toReactElement';

const Index = (props) =>
  toReactElement(props.component);

Index.propTypes = {
  component: PropTypes.shape({
    config: PropTypes.object.isRequired,
    children: PropTypes.arrayOf(PropTypes.element).isRequired,
  }).isRequired,
};

const createMapStateToProps = () => {
  const getComponent = createGetRootComponent();
  return function mapStateToProps(state, props) {
    return {
      component: getComponent(state, props),
    };
  };
};

const withRedux = connect(createMapStateToProps);
export default withRedux(Index);
