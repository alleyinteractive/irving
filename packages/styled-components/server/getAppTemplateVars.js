import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
const helmetContext = {};

export default (templateVars) => {
  const { Wrapper } = templateVars;

  return {
    Wrapper: () => (
      <HelmetProvider context={helmetContext}>
        <Wrapper />
      </HelmetProvider>
    ),
    head: () => helmetContext.helmet,
  };
};
