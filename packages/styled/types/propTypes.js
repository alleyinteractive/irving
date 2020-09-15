import PropTypes from 'prop-types';

// Eslint doesn't realize we're setting default props as a variable.
/* eslint-disable react/require-default-props */
export const standardPropTypes = {
  /**
   * React children.
   */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.element,
      ])
    ),
    PropTypes.object,
    PropTypes.node,
    PropTypes.element,
  ]).isRequired,
  /**
   * Additional classnames.
   */
  className: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.string,
  ]),
  /**
   * HTML ID attribute.
   */
  id: PropTypes.string,
  /**
   * React inline style object.
   */
  style: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]),
  /**
   * HTML tag with which this component should be rendered.
   */
  tag: PropTypes.string,
  /**
   * Theme (styles) to apply to the component.
   */
  theme: PropTypes.object,
};

export const standardDefaultProps = {
  children: [],
  id: '',
  className: '',
  style: {},
  tag: '',
};
