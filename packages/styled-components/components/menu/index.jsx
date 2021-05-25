/* eslint-disable react/forbid-prop-types, react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import useStandardProps from '@irvingjs/styled/hooks/useStandardProps';
import {
  standardPropTypes,
  getStandardDefaultProps,
} from '@irvingjs/styled/types/propTypes';
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
    theme,
  } = props;
  const standardProps = useStandardProps(props);
  const {
    Wrapper,
    NameWrapper,
    Inner,
  } = theme;

  return (
    <Wrapper
      data-location={location}
      aria-label={location}
      {...standardProps}
    >
      {(displayName && menuName) && (
        <NameWrapper>
          {menuName}
        </NameWrapper>
      )}
      {(children.length === 0) ? (
        <div>{`No menu configured for \`${location}\`.`}</div>
      ) : (
        <Inner>
          {children.map((child) => {
            const { id } = child.props;

            return (
              <MenuItem
                {...child.props}
                key={id}
                theme={theme}
              />
            );
          })}
        </Inner>
      )}
    </Wrapper>
  );
};

Menu.defaultProps = {
  ...getStandardDefaultProps(),
  theme: defaultStyles,
  children: [],
  displayName: false,
  location: '',
  menuName: '',
  style: {},
};

Menu.propTypes = {
  ...standardPropTypes,
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
};

const themeMap = {
  default: defaultStyles,
  defaultVertical: defaultVerticalStyles,
};

export {
  Menu as Component,
  themeMap,
};

export default Menu;
