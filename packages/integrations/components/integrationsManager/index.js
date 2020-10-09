import React from 'react';
import PropTypes from 'prop-types';
// User Config.
import userConfig from '@irvingjs/irving.config';
// Component Map.
import componentMap from './componentMap';
import getTrackingService from '@irvingjs/services/trackingService';

const trackingService = getTrackingService();

/**
 * Integrations Manager.
 *
 * A component that consumes a `irving/integrations` configuration from the
 * REST API and renders the corresponding integrations on the client.
 *
 * @param {Object}   props - All props.
 * @param {Object}   props.integrations - Config object for active integrations.
 */
const IntegrationsManager = ({ integrations }) => {
  // Test for empty objects.
  const isEmpty = (obj) => (
    0 === Object.keys(obj).length && obj.constructor === Object
  );

  // Bail early if no integrations exist.
  if (isEmpty(integrations)) {
    return null;
  }

  // Retrieve the keys available for render in the component map.
  const keyMap = Object.keys(integrations);

  // Create an array for hydrated component keys and props.
  const components = [];

  componentMap.forEach((component) => {
    // Get the component's key.
    const { key } = component;

    if (keyMap.includes(key)) {
      // Retrieve the key/value pairs set for the integration and convert them into props.
      // If a user config override exists, use it instead.
      let props;
      if ('integrations' in userConfig && key in userConfig.integrations) {
        props = userConfig.integrations[key];
      } else {
        props = integrations[key];
      }
      // Update the item at the current index with the transformed component.
      components.push({ key, props });
    }
  });

  /**
   * A function that takes a component key/props pair, matches the key with a
   * component that exists in the `componentMap`, and returns a valid React
   * element with the associated key and props applied.
   *
   * @param {Object} component - The component key and props.
   */
  const renderComponent = (component) => {
    // Create a map of available component keys.
    const mappedComponents = componentMap.map((co) => co.key);
    const index = mappedComponents.indexOf(component.key);

    // If the current component key exists in the key map, clone that component
    // with the hydrated props for render.
    if (- 1 < index) {
      const props = { key: component.key, ...component.props };
      // Clone the element.
      return React.createElement(componentMap[index].el, props, null);
    }

    return null;
  };

  if (components.length) {
    return (
      <>
        {components.map(renderComponent)}
      </>
    );
  }

  return null;
};

IntegrationsManager.defaultProps = {
  integrations: {},
};

IntegrationsManager.propTypes = {
  integrations: PropTypes.object,
  /**
   * React tracking.
   */
  tracking: trackingService.TrackingPropType, // eslint-disable-line react/require-default-props, react/no-unused-prop-types
};

export default trackingService.track({
  event: 'irving.componentLoaded',
  eventContext: 'irving.integrationsManager',
}, { dispatchOnMount: true })(IntegrationsManager);
