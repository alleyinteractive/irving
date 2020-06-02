import React from 'react';
import PropTypes from 'prop-types';
import withThemes from 'component-candidates/hoc/withThemes';
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
    theme = defaultStyles,
  } = props;

  const {
    Wrapper,
    NameWrapper,
    Inner,
  } = theme;

  return (
    <Wrapper data-location={location}>
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
  displayName: false,
  location: '',
  menuName: '',
  theme: defaultStyles,
};

Menu.propTypes = {
  /**
   * Children of the component.
   */
  children: PropTypes.node.isRequired,
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
   * Theme (styles) to apply to the component.
   */
  theme: PropTypes.object,
};

const themeMap = {
  default: defaultStyles,
  defaultVertical: defaultVerticalStyles,
};

export default withThemes(themeMap)(Menu);
