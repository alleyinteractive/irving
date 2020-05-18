import getDisplayName from './getDisplayName';

describe('getDisplayName', () => {
  it('should return the displayName of the component', () => {
    const Foo = () => <div>Foo.</div>;
    Foo.displayName = 'Bar';
    expect(getDisplayName('Testing', Foo)).toBe('Testing(Bar)');
  });

  it('should return the name of the component)', () => {
    const Baz = () => <div>Baz.</div>;
    expect(getDisplayName('Testing', Baz)).toBe('Testing(Baz)');
  });

  it('should return fallback component name)', () => {
    expect(getDisplayName('Testing', '')).toBe('Testing(Component)');
  });
});
