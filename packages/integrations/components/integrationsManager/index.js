import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// Integrations.
import GoogleAnalytics from '../googleAnalytics';

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
const IntegrationsManager = ({ integrations }) => {
  const [hydratedState, setHydratedState] = useState(false);
  // Build an initial component map of available integration components.
  // The components will not be rendered until the `active` property has been
  // set to true. This is done dynamically through the `useEffect` method
  // below.
  const [componentMap, setComponentMap] = useState([
    { key: 'googleAnalytics', el: <GoogleAnalytics />, active: false },
  ]);

  const hydrateComponentsWithProps = () => {
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
        components[index] = { key, el: componentWithProps, active: true };
        // Update the component map.
        setComponentMap(components);
      }
    });

    if (false === hydratedState) {
      setHydratedState(true);
    }
  };

  // This check is run on server-side renders to ensure that the component hydration
  // is ran a single time. After hydration, `hydratedState` is set to `true` and will
  // only be re-run if the `integrations` prop changes during the component lifecycle.
  if (false === hydratedState) {
    hydrateComponentsWithProps();
  }

  // This effect is run in order to update the component map as props are
  // updated and recieved. (`useEffect` is only run on client-side renders)
  useEffect(() => {
    hydrateComponentsWithProps();
  }, [integrations]);

  return (
    <>
      {componentMap.map(
        (component) => component.active && component.el
      )}
    </>
  );
};

IntegrationsManager.defaultProps = {
  integrations: {},
};

IntegrationsManager.propTypes = {
  integrations: PropTypes.shape({
    googleAnalytics: PropTypes.shape({
      trackingId: PropTypes.string,
    }),
  }),
};

export default IntegrationsManager;
