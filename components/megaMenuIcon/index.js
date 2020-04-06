/* eslint-disable react/self-closing-comp */
/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';

const MegaMenuIcon = (props) => {
  const { hovered } = props;
  return (
    <svg viewBox="0 0 31 19" xmlns="http://www.w3.org/2000/svg">
      <g stroke="none" strokeWidth="1" fill={hovered ? '#000' : '#fff'} fillRule="evenodd">
        <g transform="translate(-768.000000, -2553.000000)">
          <g transform="translate(768.000000, 2554.000000)">
            <path d="M22,0 C25.3132,0 28,2.6868 28,6 C28,9.3132 25.3132,12 22,12 C18.6868,12 16,9.3132 16,6 C16,2.6868 18.6868,0 22,0 Z" stroke={hovered ? '#fff' : '#000'} strokeWidth="2">
            </path>
            <rect fill={hovered ? '#fff' : '#000'} x="0" y="6" width="13" height="2">
            </rect>
            <rect fill={hovered ? '#fff' : '#000'} x="0" y="10.5" width="13" height="2">
            </rect>
            <rect fill={hovered ? '#fff' : '#000'} transform="translate(27.904988, 13.897039) rotate(53.000000) translate(-27.904988, -13.897039) " x="24.4049881" y="12.8970393" width="7" height="2">
            </rect>
            <rect fill={hovered ? '#fff' : '#000'} x="0" y="15" width="20" height="2">
            </rect>
          </g>
        </g>
      </g>
    </svg>
  );
};

MegaMenuIcon.defaultProps = {
  hovered: false,
};

MegaMenuIcon.propTypes = {
  hovered: PropTypes.bool,
};

export default MegaMenuIcon;
