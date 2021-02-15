import React from 'react';
import { render, screen } from '@testing-library/react';
import IntegrationsManager from './index';
import GoogleAnalytics from '../googleAnalytics';

describe('<IntegrationsManager />', () => {
  const trackingId = 'UA-000000-1';

  it('should render integrations passed as props', () => {
    const integrations = {
      googleAnalytics: {
        trackingId,
      }
    };

    render(<IntegrationsManager integrations={integrations} />);

    const manager = screen.getByTestId(trackingId);

    expect(manager).toBeDefined();
  });

  it('should not render when no integrations are present', () => {
    const integrations = {};

    const { container } = render(<IntegrationsManager integrations={integrations} />);

    // Check to see whether or not the child node has rendered.
    expect(container.firstChild).toBeNull();
  });
});
