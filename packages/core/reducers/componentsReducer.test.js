import { merge } from 'lodash/fp';
import { actionReceiveComponents } from 'actions';
import defaultState from './defaultState';
import reducer from './componentsReducer';

it('should merge received components', () => {
  const mockState = merge(defaultState, {
    route: {
      pathname: '/foo',
    },
  });

  const defaults = [
    { name: 'header', config: {}, children: [] },
    { name: 'body', config: {}, children: [] },
    { name: 'footer', config: {}, children: [] },
  ];

  const page = [
    {
      name: 'body',
      config: {},
      children: [
        { name: 'jumbotron', config: {}, children: [] },
      ],
    },
  ];

  const providers = [
    {
      name: 'root-provider',
      config: {
        providedConfig: true,
      },
      children: [],
    },
  ];

  const mockPayload = {
    defaults,
    page,
    providers,
    notFound: false,
  };
  const newState = reducer(mockState, actionReceiveComponents(mockPayload));
  expect(newState.components).toEqual({
    defaults,
    page: {
      '/foo': page,
    },
    providers: {},
  });
});
