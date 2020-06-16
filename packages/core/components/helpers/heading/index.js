import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Link from 'components/helpers/link';
import styles from './heading.css';

const Heading = (props) => {
  const {
    tag,
    children,
    typeStyle,
    link,
    className,
  } = props;
  const Tag = `${tag}`;

  return (
    <Tag className={classNames(styles[`${typeStyle}`], className)}>
      {link ?
        <Link to={link}>{children}</Link> :
        <span>{children}</span>}
    </Tag>
  );
};

Heading.propTypes = {
  /**
   * Contents of the heading. This uses children so contents can contain additional HTML/components.
   */
  children: PropTypes.node.isRequired,
  /**
   * Tag to use when rendering this heading.
   */
  tag: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'div']).isRequired,
  /**
   * Type style to use. Corresponds to a className in your stylesheet. Decoupled from tag to allow easy accessibility ordering.
   */
  typeStyle: PropTypes.string,
  /**
   * Where this heading should link.
   */
  link: PropTypes.string,
  /**
   * Additional classname(s) to apply.
   */
  className: PropTypes.string,
};

Heading.defaultProps = {
  link: '',
  className: '',
  typeStyle: 'base',
};

export default Heading;
