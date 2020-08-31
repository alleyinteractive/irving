import { renderHook, act } from '@testing-library/react-hooks';
import SiteThemeProvider from '../components/siteThemeProvider';
import useStandardProps, {
  replaceWithSiteTheme,
  createComponentNameClass,
} from './useStandardProps';

/* eslint-disable max-len */
describe('useStandardProps', () => {
  const hookWrapper = ({ children }) => (
    <SiteThemeProvider theme={{}}>{children}</SiteThemeProvider>
  );

  it('should replace an object path found in a style attribute with a value from the site theme provider', () => {
    const replacedValues = replaceWithSiteTheme({
      color: 'colors.brand.primary',
    }, {
      colors: {
        brand: {
          primary: '#012345',
        },
      },
    });

    expect(replacedValues.color).toBe('#012345');
  });

  it('should replace values in an array as well', () => {
    const replacedValues = replaceWithSiteTheme({
      color: 'colors.gray[1]',
    }, {
      colors: {
        gray: [
          '#444444',
          '#666666',
        ],
      },
    });

    expect(replacedValues.color).toBe('#666666');
  });

  it('sanitize a component name to form a valid CSS class', () => {
    const className = createComponentNameClass('test.class/test^component');

    expect(className).toBe('test-class__test-component');
  });

  it('combine classnames together, if provided', () => {
    const { result } = renderHook(
      () => useStandardProps({
        componentName: 'test.class/test^component',
        className: 'another-class',
      }, {
        className: 'component__default-class',
      }),
      { hookWrapper }
    );

    expect(result.current.className).toBe('another-class test-class__test-component component__default-class');
  });

  it('use a provided id over a default id', () => {
    const { result } = renderHook(
      () => useStandardProps(
        { id: 'id-1' },
        { id: 'id-2' }
      ),
      { hookWrapper }
    );

    expect(result.current.id).toBe('id-1');
  });

  it('only set an `as` prop if a tag is provided', () => {
    const { result } = renderHook(
      () => useStandardProps({ tag: 'div' }),
      { hookWrapper }
    );

    const { result: secondResult } = renderHook(
      () => useStandardProps({}),
      { hookWrapper }
    );

    expect(result.current.as).toBe('div');
    expect(secondResult.current.as).toBeUndefined();
  });
});
/* eslint-enable */
