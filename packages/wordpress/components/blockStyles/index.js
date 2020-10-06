import React from 'react';
import PropTypes from 'prop-types';
import getBlockMap from './blocks';

const blockMap = getBlockMap();

/* eslint-disable react/no-array-index-key */
export const BlockStyles = (props) => {
  const {
    children,
    className,
  } = props;

  return (
    <div className={`article__content ${className}`}>
      {Object.keys(blockMap).map(
        (blockName, index) => {
          const BlockStyle = blockMap[blockName];

          return (
            <BlockStyle key={`${blockName}-${index}`} />
          );
        }
      )}
      {children}
    </div>
  );
};

BlockStyles.defaultProps = {
  className: '',
};

BlockStyles.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
  className: PropTypes.string,
};

export default BlockStyles;
