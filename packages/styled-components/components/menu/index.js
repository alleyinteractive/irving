import React from 'react';
import PropTypes from 'prop-types';
import withThemes from '@irvingjs/styled/components/hoc/withThemes';
import MenuItem from './menuItem';
import * as defaultStyles from './themes/default';
import * as defaultVerticalStyles from './themes/defaultVertical';

/**
 * Output links as menu items.
 */
const Menu = (props) => {
  const {
    children,
    displayName,
    menuName,
    location,
    style,
    theme = defaultStyles,
  } = props;

  const {
    Wrapper,
    NameWrapper,
    Inner,
  } = theme;

  return (
    <Wrapper data-location={location} style={style}>
      {(displayName && menuName) && (
        <NameWrapper>
          {menuName}
        </NameWrapper>
      )}
      {(0 === children.length) ? (
        <div>{`No menu configured for \`${location}\`.`}</div>
      ) : (
        <Inner>
          {children.map((child) => (
            <MenuItem {...child.props} theme={theme} />
          ))}
        </Inner>
      )}
    </Wrapper>
  );
};

Menu.defaultProps = {
  children: [],
  displayName: false,
  location: '',
  menuName: '',
  style: {},
  theme: defaultStyles,
};

Menu.propTypes = {
  /**
   * Children of the component.
   */
  children: PropTypes.node,
  /**
   * Flag to display the menu name.
   */
  displayName: PropTypes.bool,
  /**
   * Menu location.
   */
  location: PropTypes.string,
  /**
   * Menu name.
   */
  menuName: PropTypes.string,
  /**
   * CSS styles.
   */
  style: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]),
  /**
   * Theme (styles) to apply to the component.
   */
  theme: PropTypes.object,
};

export const themeMap = {
  default: defaultStyles,
  defaultVertical: defaultVerticalStyles,
};

export { Menu as PureComponent };

export const StyledComponent = withThemes(themeMap)(Menu);

export default StyledComponent;
