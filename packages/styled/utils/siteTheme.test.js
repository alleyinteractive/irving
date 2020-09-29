import { recursivelyBuildObjectTree } from './siteTheme';

describe('createComponentDataKey', () => {
  it('should return an empty tree', () => {
    expect(recursivelyBuildObjectTree({}, {})).toEqual({});
  });

  it('should not modify any values', () => {
    expect(recursivelyBuildObjectTree(
      {
        color: {
          red: '#bd2925',
        },
      },
      {
        color: {
          red: '#bd2925',
        },
      }
    )).toEqual({
      color: {
        red: '#bd2925',
      },
    });
  });

  it('should replace one value', () => {
    expect(recursivelyBuildObjectTree(
      {
        color: {
          red: '#bd2925',
        },
        nested: {
          value: 'color.red',
        }
      },
      {
        color: {
          red: '#bd2925',
        },
        nested: {
          value: 'color.red',
        }
      }
    )).toEqual({
      color: {
        red: '#bd2925',
      },
      nested: {
        value: '#bd2925',
      }
    });
  });

  it('should recursively replace one value', () => {
    expect(recursivelyBuildObjectTree(
      {
        color: {
          red: '#bd2925',
        },
        nested: {
          one: 'color.red',
          two: 'nested.one',
        }
      },
      {
        color: {
          red: '#bd2925',
        },
        nested: {
          one: 'color.red',
          two: 'nested.one',
        }
      }
    )).toEqual({
      color: {
        red: '#bd2925',
      },
      nested: {
          one: '#bd2925',
          two: '#bd2925',
      }
    });
  });
});
