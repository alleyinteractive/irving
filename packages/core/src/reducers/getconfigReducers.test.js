import getConfigReducers from './getConfigReducers';

it('should get reducers from configured packages', () => {
  const mockConfig = {
    packages: {
      test: {
        reducers: {
          mySlice: () => {},
        },
      },
    },
  };
  const configReducers = getConfigReducers(mockConfig);

  expect(Object.keys(configReducers)).toEqual(['mySlice']);
});
