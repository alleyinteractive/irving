import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import toReactWrapper from 'utils/toReactWrapper';

const RootProviders = (props) => {
  const {
    providers,
    children,
  } = props;

  if (! providers.length) {
    return children;
  }

  return (
    <Fragment>
      {toReactWrapper(providers, children)}
    </Fragment>
  );
};

RootProviders.propTypes = {
  /**
   * Root component object derived from current state
   */
  providers: PropTypes.arrayOf(
    PropTypes.shape({
      /**
       * Component configuration (mapped to props)
       */
      config: PropTypes.object.isRequired,
    }).isRequired,
  ).isRequired,

  /**
   * Children to render within providers
   */
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default RootProviders;
