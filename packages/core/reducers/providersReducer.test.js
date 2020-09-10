import providersReducer from './providersReducer';
import { RECEIVE_COMPONENTS } from 'actions/types';

describe('providersReducer', () => {
  const mockState = {
    components: {
      providers: {},
    },
    route: {
      pathname: '/test-route',
      cookie: {},
      search: '?test-query=value',
    },
  };

  const providerData = {
    name: 'irving/test-provider',
    config: {
      lorem: 'ipsum',
      dolor: 'sit',
      amet: 'adipscing',
    },
  };

  const providerDataWithKey = {
    ...providerData,
    config: {
      ...providerData.config,
      providerKey: 'my-key',
    },
  };

  it('should set up state with a default key if no specific key is provided', () => {
    const action = {
      type: RECEIVE_COMPONENTS,
      payload: {
        providers: [providerData],
      },
    };

    const result = providersReducer(mockState, action);

    expect(result.components.providers).toStrictEqual({
      'irving/test-provider': {
        current: {
          key: 'default',
          config: {
            lorem: 'ipsum',
            dolor: 'sit',
            amet: 'adipscing',
          },
        },
        default: {
          lorem: 'ipsum',
          dolor: 'sit',
          amet: 'adipscing',
        },
      },
    });
  });

  it('should use a specific key if provided', () => {
    const action = {
      type: RECEIVE_COMPONENTS,
      payload: {
        providers: [providerDataWithKey],
      },
    };

    const result = providersReducer(mockState, action);
    const resultState = result.components
      .providers['irving/test-provider'];

    expect(resultState.current.key).toBe('my-key');
    expect(resultState['my-key']).toBeDefined();
  });

  it('should update current to use a new key and config, if provided', () => {
    const providerDataTwo = {
      ...providerDataWithKey,
      config: {
        ...providerDataWithKey.config,
        providerKey: 'my-key-two',
        lorem: 'this is now updated',
      },
    };
    const actionOne = {
      type: RECEIVE_COMPONENTS,
      payload: {
        providers: [providerDataWithKey],
      },
    };
    const actionTwo = {
      type: RECEIVE_COMPONENTS,
      payload: {
        providers: [providerDataTwo],
      },
    };

    const firstResult = providersReducer(mockState, actionOne);
    const finalResult = providersReducer(firstResult, actionTwo);
    const resultState = finalResult.components
      .providers['irving/test-provider'];

    expect(resultState.current).toStrictEqual({
      key: 'my-key-two',
      config: {
        providerKey: 'my-key-two',
        lorem: 'this is now updated',
        dolor: 'sit',
        amet: 'adipscing',
      },
    });
    expect(resultState['my-key']).toEqual({
      providerKey: 'my-key',
      lorem: 'ipsum',
      dolor: 'sit',
      amet: 'adipscing',
    });
    expect(resultState['my-key-two']).toEqual({
      providerKey: 'my-key-two',
      lorem: 'this is now updated',
      dolor: 'sit',
      amet: 'adipscing',
    });
  });

  it('should use route key if providerKey is set to string`routeKey`', () => {
    const action = {
      type: RECEIVE_COMPONENTS,
      payload: {
        providers: [{
          ...providerDataWithKey,
          config: {
            ...providerDataWithKey.config,
            providerKey: 'route',
          },
        }],
      },
    };

    const result = providersReducer(mockState, action);
    const resultState = result.components
      .providers['irving/test-provider'];

    expect(resultState.current.key).toBe('/test-route?test-query=value');
  });
});
