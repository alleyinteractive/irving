import getFieldFromUserConfig from './getFieldFromUserConfig';

it('should get provided field from configured packages', () => {
  const mockConfig = {
    packages: {
      test: {
        reducers: () => ({
          mySlice: () => {},
        }),
      },
    },
  };
  const configReducers = getFieldFromUserConfig(
    mockConfig,
    'reducers',
    'object'
  );

  expect(Object.keys(configReducers)).toEqual(['mySlice']);
});

it('should get user-configured reducers', () => {
  const mockConfig = {
    reducers: () => ({
      userSlice: () => {},
    }),
  };
  const configReducers = getFieldFromUserConfig(
    mockConfig,
    'reducers',
    'object'
  );

  expect(Object.keys(configReducers)).toEqual(['userSlice']);
});

it('should merge package and user reducers', () => {
  const mockConfig = {
    packages: {
      test: {
        reducers: () => ({
          packageSlice: () => {},
          testSlice: () => {},
        }),
      },
    },
    reducers: () => ({
      userSlice: () => {},
      testSlice: () => {},
    }),
  };
  const configReducers = getFieldFromUserConfig(
    mockConfig,
    'reducers',
    'object'
  );

  expect(Object.keys(configReducers))
    .toEqual(['packageSlice', 'testSlice', 'userSlice']);
});
