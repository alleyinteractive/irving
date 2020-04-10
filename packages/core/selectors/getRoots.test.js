import getRoots from './getRoots';

it('should get a list of empty root component names', () => {
  const mockState = {
    components: {
      defaults: [],
    },
  };

  expect(getRoots(mockState)).toEqual([]);
});

it('should get an empty array if no component array is passed', () => {
  expect(getRoots({})).toEqual([]);
});

it('should get a list of root component names', () => {
  const mockState = {
    components: {
      defaults: [
        {
          name: 'head',
        },
        {
          name: 'google-tag-manager',
        },
        {
          name: 'header',
        },
      ],
    },
  };

  expect(getRoots(mockState)).toEqual(
    [
      'head',
      'google-tag-manager',
      'header',
    ]
  );
});

it('should get a list of root component names with only one component name',
  () => {
    const mockState = {
      components: {
        defaults: [
          {
            name: 'head',
          },
        ],
      },
    };

    expect(getRoots(mockState)).toEqual(['head']);
  });
