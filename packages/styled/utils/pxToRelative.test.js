import {
  em,
  rem,
  createRelativeConverter,
} from './pxToRelative';
import siteTheme from './siteTheme';

describe('pxToRelative', () => {
  it('should convert px values to em', () => {
    const emVal = em('16');
    expect(emVal).toBe('1em');
  });

  it('should convert px values to rem', () => {
    const remVal = rem('16');
    expect(remVal).toBe('1rem');
  });

  it('should be able to create custom relative converter functions', () => {
    const customFunc = createRelativeConverter('test', '20');
    const val = customFunc('40');
    expect(val).toBe('2test');
  });

  it('should convert any number of values passed and concatenate the results', () => {
    const remVal = rem(16, 24, 88);
    expect(remVal).toBe('1rem 1.5rem 5.5rem');
  });

  it('should call other utility functions to resolve values', () => {
    const mockProps = {
      theme: {
        spacing: {
          marginLeft: '32',
        },
      },
    };
    const remVal = rem('16', siteTheme('spacing.marginLeft'))(mockProps);
    expect(remVal).toBe('1rem 2rem');
  });
});
