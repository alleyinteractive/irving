module.exports = {
  componentMap: {
    foo: () => (<div>foo</div>),
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
  },
};
