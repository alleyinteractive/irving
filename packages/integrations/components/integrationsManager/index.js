/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
// Redux.
import { connect } from 'react-redux';
import { actionHydrateComponents } from '../../actions';
// Integrations.
import componentMap from './componentMap';

/**
 * Integrations Manager.
 *
 * A component that consumes a `irving/integrations` configuration from the
 * REST API, Irving config, or persisted Redux state slice and renders the
 * corresponding integrations on the client.
 *
 * @param {Object} props - All props.
 * @param {Object} props.integrations - Config object for active integrations.
 */
const IntegrationsManager = ({
  integrations,
  isHydrated,
  hydrateComponents,
  hydratedComponents,
}) => {
  console.log(hydratedComponents);
  // This check is run on server-side renders to ensure that the component hydration
  // is ran a single time. After hydration, `hydratedState` is set to `true` and will
  // only be re-run if the `integrations` prop changes during the component lifecycle.
  if (false === isHydrated) {
    // Retrieve the keys available for render in the component map.
    const keyMap = Object.keys(integrations);

    componentMap.forEach((component, index) => {
      // Get the component's key.
      const { key } = component;

      if (- 1 < keyMap.indexOf(key)) {
        // Retrieve the key/value pairs set for the integration and convert them into props.
        const props = integrations[key];
        // Clone the component with the associated props and a key for render mapping.
        const componentWithProps = React.cloneElement(
          component.el,
          { ...props, key },
          null
        );
        // Clone the component map.
        const components = [...componentMap];
        // Update the item at the current index with the transformed component.
        components[index] = { key, el: componentWithProps };
        // Update the component map.
        hydrateComponents(components);
      }
    });
  }

  return null;
  // return (
  //   <>
  //     {0 < hydratedComponents.length && hydratedComponents.map(
  //       (component) => component.el
  //     )}
  //   </>
  // );
};

IntegrationsManager.defaultProps = {
  integrations: {},
  hydratedComponents: [],
};

IntegrationsManager.propTypes = {
  integrations: PropTypes.shape({
    googleAnalytics: PropTypes.shape({
      trackingId: PropTypes.string,
    }),
  }),
  isHydrated: PropTypes.bool.isRequired,
  hydrateComponents: PropTypes.func.isRequired,
  hydratedComponents: PropTypes.arrayOf(PropTypes.object),
};

const mapStateToProps = (state, ownProps) => {
  const {
    integrations: {
      componentMap: components,
      hydrated,
    },
  } = state;

  if (hydrated) {
    return {
      isHydrated: hydrated,
      hydratedComponents: components,
    };
  }

  return {
    isHydrated: hydrated,
    integrations: ownProps.integrations,
  };
};

const mapDispatchToProps = (dispatch) => ({
  hydrateComponents: (data) => dispatch(actionHydrateComponents(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IntegrationsManager);
