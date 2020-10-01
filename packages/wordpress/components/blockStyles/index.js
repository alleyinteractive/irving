import React from 'react';
import PropTypes from 'prop-types';
import blockMap from './blocks';

/* eslint-disable react/no-array-index-key */
export const BlockStyles = (props) => {
  const { children } = props;

  return (
    <>
      {Object.keys(blockMap).map(
        (blockName, index) => {
          const BlockStyle = blockMap[blockName];

          return (
            <BlockStyle key={`${blockName}-${index}`} />
          );
        }
      )}
      {children}
    </>
  );
};

BlockStyles.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
};

export default BlockStyles;
