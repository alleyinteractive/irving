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
  let store;

  it('should render the appropriate integration once hydrated with a configuration', () => {
    store = mockStore({
      integrations: {
        componentMap: [{
          key: 'googleAnalytics',
          props: {
            trackingId: 'UA-000000-1',
          },
        }],
        hydrated: true,
      },
    });

    const wrapper = mount(
      <Provider store={store}>
        <IntegrationsManager />
      </Provider>
    );

    const result = wrapper.find(GoogleAnalytics);
    const expected = <GoogleAnalytics trackingId="UA-000000-1" />;
    // Check to see whether or not the child node has rendered.
    expect(wrapper.contains(expected)).toEqual(true);
    // Ensure the node props match the expected result.
    expect(result.prop('trackingId')).toEqual(mount(expected).prop('trackingId'));
  });

  it('should not render any children if no configuration is present', () => {
    store = mockStore({
      integrations: {
        componentMap: [],
        hydrated: false,
      },
    });

    const wrapper = mount(
      <Provider store={store}>
        <IntegrationsManager />
      </Provider>
    );

    const result = wrapper.find(IntegrationsManager);
    // The <IntegrationsManager /> node should not contain a specified integration.
    expect(result.contains(GoogleAnalytics)).toEqual(false);
  });
});
