const React = require('react');

module.exports = {
  foo: ({ children }) => (
    <div>
      foo
      <span>{children}</span>
    </div>
  ),
  baz: () => (<div>baz</div>),
  buzz: () => (<div>buzz</div>),
  bar: (props) => {
    const {
      componentGroups: {
        group1,
        group2,
      },
    } = props;

    return (
      <div>
        {group1}
        {group2}
      </div>
    );
  },
  'irving/test-provider': ({ children }) => (
    <div data-testid="provider">
      I am a provider
      {children}
    </div>
  ),
};
