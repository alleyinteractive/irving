import merge from 'lodash/fp/merge';
import defaultState from 'reducers/defaultState';
import createGetRootComponent from './createGetRootComponent';

describe('createGetRootComponent', () => {
  it('should select default component', () => {
    const mockState = merge(defaultState, {
      components: {
        defaults: [
          { name: 'header', config: {}, children: [] },
        ],
      },
    });

    const getComponent = createGetRootComponent();
    expect(getComponent(mockState, { name: 'header' })).toEqual({
      name: 'header',
      config: {},
      children: [],
    });
  });

  it('should select override component', () => {
    const mockState = merge(defaultState, {
      route: {
        pathname: '/foo',
      },
      components: {
        defaults: [
          { name: 'header', config: {}, children: [] },
        ],
        page: {
          '/foo': [
            {
              name: 'header',
              config: { foo: true },
              children: [],
            },
          ],
        },
      },
    });

    const getComponent = createGetRootComponent();
    expect(getComponent(mockState, { name: 'header' })).toEqual({
      name: 'header',
      config: { foo: true },
      children: [],
    });
  });
});
