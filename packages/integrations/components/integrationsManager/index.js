/* eslint-disable */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// Integration Components.
import GoogleAnalytics from '../googleAnalytics';

const IntegrationsManager = ({ integrations }) => {
  const [componentMap, setComponentMap] = useState([]);

  useEffect(() => {
    const componentKeys = componentMap.map((i) => i.key);

    if (integrations.googleAnalytics !== undefined && componentKeys.indexOf('googleAnalytics') === -1) {
      const { trackingId } = integrations.googleAnalytics;

      setComponentMap([
        ...componentMap,
      { key: 'googleAnalytics', el: <GoogleAnalytics trackingId={trackingId} /> },
      ]);
    }
  }, [integrations]);

  return (
    <>
      {componentMap.map((comp) => comp.el)}
    </>
  );
};

export default IntegrationsManager;
