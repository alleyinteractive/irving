import React from 'react';
import PropTypes from 'prop-types';
import * as defaultStyles from './themes/default';

/**
 * Menu item.
 *
 * Render a single menu item.
 *
 * @todo Replace <a> with a proper <Link> component.
 */
const MenuItem = (props) => {
  const {
    attributeTitle,
    classes,
    children,
    id,
    level,
    target,
    theme = defaultStyles,
    title,
    url,
  } = props;

  const {
    ItemWrapper,
    Dropdown,
  } = theme;

  return (
    <ItemWrapper key={id} classnames={classes}>
      <li>
        <a href={url} target={target} title={attributeTitle}>{title}</a>
        {children && (
          <Dropdown>
            {children.map((child) => (
              <MenuItem
                key={child.props.id}
                level={level + 1}
                {...child.props}
              />
            ))}
          </Dropdown>
        )}
      </li>
    </ItemWrapper>
  );
};

MenuItem.defaultProps = {
  attributeTitle: '',
  classes: [],
  id: 0,
  level: 1,
  target: '',
  theme: defaultStyles,
  title: '',
  url: '',
};

MenuItem.propTypes = {
  /**
   * Value of the title attribute.
   */
  attributeTitle: PropTypes.string,
  /**
   * Children of the component.
   */
  children: PropTypes.node.isRequired,
  /**
   * Classnames.
   */
  classes: PropTypes.array,
  /**
   * Unique key.
   */
  id: PropTypes.number,
  /**
   * Menu level.
   */
  level: PropTypes.number,
  /**
   * Target attribute value.
   */
  target: PropTypes.string,
  /**
   * Theme (styles) to apply to the component.
   */
  theme: PropTypes.object,
  /**
   * Title.
   */
  title: PropTypes.string,
  /**
   * URL.
   */
  url: PropTypes.string,
};

export default MenuItem;
