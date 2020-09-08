import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
// Components.
import IntegrationsManager from './index';
import GoogleAnalytics from '../googleAnalytics';
// Actions.

const mockStore = configureStore([]);

describe('<IntegrationsManager />', () => {
  it('should render integrations passed as props', () => {
    const integrations = {
      googleAnalytics: {
        trackingId: 'UA-000000-1',
      }
    };

    const wrapper = mount(
      <IntegrationsManager integrations={integrations} />
    );

    const result = wrapper.find(GoogleAnalytics);
    const expected = <GoogleAnalytics trackingId="UA-000000-1" />;

    // Check to see whether or not the child node has rendered.
    expect(wrapper.contains(expected)).toEqual(true);
    // Ensure the node props match the expected result.
    expect(result.prop('trackingId')).toEqual(mount(expected).prop('trackingId'));
  });

  it('should not render when no integrations are present', () => {
    const integrations = {};

    const wrapper = mount(
      <IntegrationsManager integrations={integrations} />
    );

    // Check to see whether or not the child node has rendered.
    expect(wrapper.children().exists()).toEqual(false);
  });
});
