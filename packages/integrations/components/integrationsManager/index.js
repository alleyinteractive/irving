import React from 'react';
import PropTypes from 'prop-types';
// Redux.
import { connect } from 'react-redux';
import { actionHydrateComponents } from '../../actions';
// Integration components.
import GoogleAnalytics from '../googleAnalytics';

/**
 * Integrations Manager.
 *
 * A component that consumes a `irving/integrations` configuration from the
 * REST API, Irving config, or persisted Redux state slice and renders the
 * corresponding integrations on the client.
 *
 * @param {Object}   props - All props.
 * @param {Object}   props.integrations - Config object for active integrations.
 * @param {boolean}  props.isHydrated - Has the component map already been hydrated?
 * @param {function} props.hydrateComponents - Redux action for updating the `componentMap` in the state tree.
 * @param {Object}   props.hydratedComponents - The existing component key/prop pairs.
 */
const IntegrationsManager = ({
  integrations,
  isHydrated,
  hydrateComponents,
  hydratedComponents,
}) => {
  const componentMap = [
    { key: 'googleAnalytics', el: GoogleAnalytics },
  ];

  // This check is run on server-side renders to ensure that the component hydration
  // is ran a single time. After hydration, `hydratedState` is set to `true` and will
  // only be re-run if the `integrations` prop changes during the component lifecycle.
  if (false === isHydrated) {
    // Retrieve the keys available for render in the component map.
    const keyMap = Object.keys(integrations);

    // Create an array for hydrated component keys and props.
    const components = [];

    componentMap.forEach((component, index) => {
      // Get the component's key.
      const { key } = component;

      if (- 1 < keyMap.indexOf(key)) {
        // Retrieve the key/value pairs set for the integration and convert them into props.
        const props = integrations[key];
        // Update the item at the current index with the transformed component.
        components[index] = { key, props };
      }
    });

    // Update the components in the store.
    hydrateComponents(components);
  }

  /**
   * A function that takes a component key/props pair, matches the key with a
   * component that exists in the `componentMap`, and returns a valid React
   * element with the associated key and props applied.
   *
   * @param {Object} component - The component key and props.
   */
  const renderComponents = (component) => {
    // Create a map of available component keys.
    const keyMap = componentMap.map((co) => co.key);
    const index = keyMap.indexOf(component.key);

    // If the current component key exists in the key map, clone that component
    // with the hydrated props for render.
    if (- 1 < index) {
      const props = { key: component.key, ...component.props };
      // Clone the element.
      return React.createElement(componentMap[index].el, props, null);
    }

    return null;
  };

  if (0 < hydratedComponents.length) {
    return (
      <>
        {hydratedComponents.map(renderComponents)}
      </>
    );
  }

  return null;
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
