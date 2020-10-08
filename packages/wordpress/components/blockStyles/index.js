import { createGlobalStyle } from 'styled-components';
import getBlockMap from './blocks';

const blockMap = getBlockMap();

const BlockStyles = createGlobalStyle`
  ${Object.values(blockMap)
    .map((blockStyles) => blockStyles)}
`;

export default BlockStyles;
