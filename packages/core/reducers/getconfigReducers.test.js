import getConfigReducers from './getConfigReducers';

it('should get reducers from configured packages', () => {
  const mockConfig = {
    packages: {
      test: {
        reducers: () => ({
          mySlice: () => {},
        }),
      },
    },
  };
  const configReducers = getConfigReducers(mockConfig);

  expect(Object.keys(configReducers)).toEqual(['mySlice']);
});

it('should get user-configured reducers', () => {
  const mockConfig = {
    reducers: () => ({
      userSlice: () => {},
    }),
  };
  const configReducers = getConfigReducers(mockConfig);

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
  const configReducers = getConfigReducers(mockConfig);

  expect(Object.keys(configReducers))
    .toEqual(['packageSlice', 'testSlice', 'userSlice']);
});
