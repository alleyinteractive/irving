import { recursivelyBuildObjectTree } from './siteTheme';

describe('createComponentDataKey', () => {
  it('should return an empty tree', () => {
    expect(recursivelyBuildObjectTree({}, {})).toEqual({});
  });

  it('should not modify any values', () => {
    expect(recursivelyBuildObjectTree({
      color: {
        red: '#bd2925',
      },
    })).toEqual({
      color: {
        red: '#bd2925',
      },
    });
  });

  it('should replace one value', () => {
    expect(recursivelyBuildObjectTree({
      color: {
        red: '#bd2925',
      },
      nested: {
        value: 'color.red',
      }
    })).toEqual({
      color: {
        red: '#bd2925',
      },
      nested: {
        value: '#bd2925',
      }
    });
  });

  it('should recursively replace one value', () => {
    expect(recursivelyBuildObjectTree({
      color: {
        red: '#bd2925',
      },
      nested: {
        one: 'color.red',
        two: 'nested.one',
      }
    })).toEqual({
      color: {
        red: '#bd2925',
      },
      nested: {
          one: '#bd2925',
          two: '#bd2925',
      }
    });
  });

  it('should recursively replace multiple nested value', () => {
    expect(recursivelyBuildObjectTree({
      color: {
        primary: {
          light: '#eca2a0',
          normal: '#bd2925',
          dark: '#2f0a09',
        },
      },
      templates: {
        header: {
          color: 'color.primary.light',
          backgroundColor: 'color.primary.dark',
          borderColor: 'color.primary.normal',
          button: {
            color: 'templates.header.color',
          },
        },
      },
    })).toEqual({
      color: {
        primary: {
          light: '#eca2a0',
          normal: '#bd2925',
          dark: '#2f0a09',
        },
      },
      templates: {
        header: {
          color: '#eca2a0',
          backgroundColor: '#2f0a09',
          borderColor: '#bd2925',
          button: {
            color: '#eca2a0',
          },
        },
      },
    });
  });
});
