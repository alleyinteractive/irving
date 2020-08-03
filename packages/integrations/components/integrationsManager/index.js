import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// Integrations.
import GoogleAnalytics from '../googleAnalytics';

const IntegrationsManager = ({ integrations }) => {
  // Build an initial component map of available integration components.
  // The components will not be rendered until the `active` property has been
  // set to true. This is done dynamically through the `useEffect` method
  // below.
  const [componentMap, setComponentMap] = useState([
    { key: 'googleAnalytics', el: <GoogleAnalytics />, active: false },
  ]);

  // This effect is run in order to populate the component map as props are
  // updated and recieved. It will only be run on initial mount and if/when the
  // whitelisted props change during the component lifecycle.
  useEffect(() => {
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
