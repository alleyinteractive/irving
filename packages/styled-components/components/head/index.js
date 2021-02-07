import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

const Head = (props) => {
  const { children } = props;
  const validTypes = [
    'title',
    'base',
    'meta',
    'link',
    'script',
    'noscript',
    'style',
    'body',
    'html',
  ];
  const otherChildren = children.filter(
    ({ name }) => ! validTypes.includes(name)
  );
  const helmetChildren = children
    .filter(({ name }) => validTypes.includes(name))
    .map((child) => {
      const {
        name,
        children: tagContent,
        config,
      } = child;

      if (
        ('script' === name || 'style' === name) &&
        Array.isArray(child.children) &&
        child.children.length
      ) {
        // <Helmet> requires the `children` prop for `style` and `script`
        // elements to be a string. As such, we reduce the array to a
        // single string using join().
        return React.createElement(
          name,
          config,
          tagContent.join('')
        );
      }

      return React.createElement(name, config);
    });

  console.log(helmetChildren);

  return (
    <>
      <Helmet>
        {helmetChildren}
      </Helmet>
      {otherChildren}
    </>
  );
};

Head.defaultProps = {
  children: {},
};

Head.propTypes = {
  /**
   * Children of the component.
   */
  children: PropTypes.node,
};

export { Head as Component };

export default Head;
