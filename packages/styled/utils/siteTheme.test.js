import siteTheme, { recursivelyBuildObjectTree } from './siteTheme';

describe('siteTheme', () => {
  const mockProps = {
    isError: true,
    theme: {
      colors: {
        primary: '#bd2925',
        secondary: '#bdFF23',
      },
      options: {
        showBorder: true,
        showButton: false,
      },
    },
  };

  it('should retrieve a value from siteTheme', () => {
    const value = siteTheme('colors.primary')(mockProps);
    expect(value).toEqual('#bd2925');
  });

  it('should fall back to a default value if nothing is found in provided path', () => {
    const value = siteTheme('colors.red', '#AABBCC')(mockProps);
    expect(value).toEqual('#AABBCC');
  });

  it('should retrieve a default value from siteTheme, if possible', () => {
    const value = siteTheme('colors.red', 'colors.secondary')(mockProps);
    expect(value).toEqual('#bdFF23');
  });

  it('should perform a ternary operation if a third parameter is provided', () => {
    const trueValue = siteTheme(
      'options.showBorder',
      '1px solid blue',
      'none'
    )(mockProps);

    const falseValue = siteTheme(
      'options.showButton',
      'block',
      'none'
    )(mockProps);
    expect(trueValue).toEqual('1px solid blue');
    expect(falseValue).toEqual('none');
  });

  it('ternaries should support booleans passet in directly to the first param', () => {
    const value = siteTheme(mockProps.isError, 'red', 'blue')(mockProps);
    expect(value).toEqual('red');
  });
});

describe('recursivelyBuildObjectTree', () => {
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
      },
    })).toEqual({
      color: {
        red: '#bd2925',
      },
      nested: {
        value: '#bd2925',
      },
    });
  });

  it('should replace multiple values in embedded in strings', () => {
    expect(recursivelyBuildObjectTree({
      color: {
        red: '#bd2925',
        blue: '#0000FF',
      },
      nested: {
        border: '1px solid color.red',
        background: 'linear-gradient(to-left, color.red, color.blue)',
      },
    })).toEqual({
      color: {
        red: '#bd2925',
        blue: '#0000FF',
      },
      nested: {
        border: '1px solid #bd2925',
        background: 'linear-gradient(to-left, #bd2925, #0000FF)',
      },
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
